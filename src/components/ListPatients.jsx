import React, { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import HeaderPage from "./header.jsx";
import Patient_css from "./../css/patient.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListPatient = () => {
    const [nationalID, setNationalID] = useState("");
    const [department, setDepartment] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [medications, setMedications] = useState([]);
    const [medicationEntries, setMedicationEntries] = useState([]);
    const [issuingProfile, setIssuingProfile] = useState(null);
    const [error, setError] = useState(null);
    const [remainingQuantity, setRemainingQuantity] = useState({});

    useEffect(() => {
        const fetchDepartment = async (uid) => {
            try {
                const querySnapshot = await getDocs(collection(db, "info"));
                let foundNationalID = null;

                querySnapshot.forEach((doc) => {
                    if (doc.data().uid === uid) {
                        foundNationalID = doc.id;
                    }
                });

                if (foundNationalID) {
                    setNationalID(foundNationalID);
                    const docRef = doc(db, "info", foundNationalID);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setDepartment(docSnap.data().department);
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("UID not found!");
                }
            } catch (err) {
                console.error("Error fetching document:", err);
                setError("Error fetching department.");
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchDepartment(user.uid);
            } else {
                setError("No user is logged in.");
            }
        });
    }, []);

    useEffect(() => {
        const fetchProfiles = async () => {
            if (department) {
                try {
                    const q = query(
                        collection(db, "info"),
                        where("department", "==", department),
                        where("role", "==", "Patient")
                    );
                    const querySnapshot = await getDocs(q);
                    const profilesList = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setProfiles(profilesList);
                    setFilteredProfiles(profilesList);
                } catch (err) {
                    console.error("Error fetching profiles:", err);
                    setError("Error fetching profiles.");
                }
            }
        };

        fetchProfiles();
    }, [department]);

    useEffect(() => {
        const filtered = profiles.filter(
            (profile) =>
                profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.idv.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProfiles(filtered);
    }, [searchTerm, profiles]);

    useEffect(() => {
        const fetchMedications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "medicines"));
                const medicationsList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMedications(medicationsList);
            } catch (err) {
                console.error("Error fetching medications:", err);
                setError("Error fetching medications.");
            }
        };

        fetchMedications();
    }, []);
    const [modal1Show, setModal1Show] = useState(false);
    const [modal2Show, setModal2Show] = useState(false);

    const handleOpenModal1 = () => setModal1Show(true);
    const handleCloseModal1 = () => setModal1Show(false);

    const handleOpenModal2 = () => setModal2Show(true);
    const handleCloseModal2 = () => setModal2Show(false);
    const handleEditClick = (profile) => {
        handleOpenModal1();
        setSelectedProfile(profile);
    };

    const handleSave = async (updatedProfile) => {
        try {
            const profileRef = doc(db, "info", updatedProfile.id);
            await updateDoc(profileRef, updatedProfile);
            setProfiles(
                profiles.map((profile) =>
                    profile.id === updatedProfile.id ? updatedProfile : profile
                )
            );
            setSelectedProfile(null);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Error updating profile.");
        }
    };

    const handleAddMedication = () => {
        setMedicationEntries([
            ...medicationEntries,
            { id: "", batchNumber: "", quantity: 0, manual: "" },
        ]);
    };

    const handleMedicationChange = (index, field, value) => {
        const newEntries = medicationEntries.map((entry, i) => {
            if (i === index) {
                return { ...entry, [field]: value };
            }
            return entry;
        });
        setMedicationEntries(newEntries);

        // Fetch and display remaining quantity for the selected batch
        if (field === "batchNumber") {
            const selectedMed = medications.find(
                (med) => med.id === newEntries[index].id
            );
            const batch = selectedMed
                ? selectedMed.batches.find((b) => b.batchNumber === value)
                : null;
            if (batch) {
                setRemainingQuantity((prevState) => ({
                    ...prevState,
                    [index]: batch.quantityInOut,
                }));
            }
        }
    };

    const handleMedicationIssue = async (e) => {
        e.preventDefault();

        try {
            const newMedications = [];

            for (const entry of medicationEntries) {
                const selectedMed = medications.find((med) => med.id === entry.id);
                if (!selectedMed) {
                    setError(`Medication ${entry.id} not found.`);
                    return;
                }

                const batch = selectedMed.batches.find(
                    (b) =>
                        b.batchNumber === entry.batchNumber &&
                        b.quantityInOut >= entry.quantity
                );
                if (!batch) {
                    setError(
                        `Insufficient quantity in batch ${entry.batchNumber} for ${entry.id}.`
                    );
                    return;
                }

                const updatedBatches = selectedMed.batches.map((b) =>
                    b.batchNumber === batch.batchNumber
                        ? { ...b, quantityInOut: b.quantityInOut - entry.quantity }
                        : b
                );

                const medRef = doc(db, "medicines", entry.id);
                await updateDoc(medRef, { batches: updatedBatches });

                newMedications.push({
                    medicationId: entry.id,
                    batchNumber: entry.batchNumber,
                    expirationDate: batch.expirationDate,
                    quantity: entry.quantity,
                    manual: entry.manual,
                });

                alert(
                    `Issued ${entry.quantity} units of ${entry.id} from batch ${batch.batchNumber} to ${issuingProfile.name}`
                );
            }

            if (issuingProfile) {
                const profileRef = doc(db, "info", issuingProfile.id);
                await updateDoc(profileRef, {
                    prescribedMedications: newMedications,
                });
            }

            setIssuingProfile(null);
            setMedicationEntries([]);
        } catch (err) {
            console.error("Error issuing medication:", err);
            setError("Error issuing medication.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedProfile({ ...selectedProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(selectedProfile);
    };

    const handleIssueClick = (profile) => {
        handleOpenModal2();
        setIssuingProfile(profile);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <HeaderPage />
            <div className="container">
                <h1 className="text-bg-primary mt-5">
                    Profiles in Department: {department}
                </h1>
                <p> --- Current ID: {nationalID}</p>
                <h2 className="text-center">Dánh sách các bệnh nhân</h2>
                <input
                    type="text"
                    placeholder="Search profiles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control mx-auto"
                    style={{ width: "20%" }}
                />
                <div className={` ${Patient_css.patient_list_content} mb-5 mt-4`}>
                    <table className={`table ${Patient_css.table}`}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">IDV</th>
                                <th scope="col">Role</th>
                                <th scope="col">Symptoms</th>
                                <th scope="col">Edit</th>
                                <th scope="col"> Issue Medication</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProfiles.map((profile) => (
                                <tr key={profile.id}>
                                    <td>{profile.name} </td>
                                    <td>{profile.department}</td>
                                    <td>{profile.idv} </td>
                                    <td>{profile.role} </td>
                                    <td>{profile.symptoms} </td>
                                    <td id={Patient_css.trash_bin}>
                                        <a href="#">
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                onClick={() => handleEditClick(profile)}
                                                className="text-success"
                                            />
                                        </a>
                                    </td>

                                    <td>
                                        <button onClick={() => handleIssueClick(profile)} className="btn btn-success">
                                            Issue Medication
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedProfile && (
                    <Modal show={modal1Show} onHide={handleCloseModal1} id="form_add">
                        <Modal.Header closeButton>
                            <Modal.Title>Patient Informations Editting</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h1 className="modal-title fs-5 mb-2" id="exampleModalLabel">
                                Patient informations:
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <label>Name: </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={selectedProfile.name}
                                    onChange={handleChange}
                                    className="form-control w-50"
                                />
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <label>Department:</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={selectedProfile.department}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                    <div>
                                        <label>IDV: </label>
                                        <input
                                            type="text"
                                            name="idv"
                                            value={selectedProfile.idv}
                                            onChange={handleChange}
                                            className="form-control"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <label>Role: </label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={selectedProfile.role}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                    <div>
                                        <label>Symptoms: </label>
                                        <input
                                            type="text"
                                            name="symptoms"
                                            value={selectedProfile.symptoms || ""}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <label>Physical Examination: </label>
                                        <input
                                            type="text"
                                            name="physicalExamination"
                                            value={selectedProfile.physicalExamination || ""}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                    <div>
                                        <label>Diagnostic Tests: </label>
                                        <input
                                            type="text"
                                            name="diagnosticTests"
                                            value={selectedProfile.diagnosticTests || ""}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <label>Assessment and Plan: </label>
                                        <input
                                            type="text"
                                            name="assessmentAndPlan"
                                            value={selectedProfile.assessmentAndPlan || ""}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                    <div>
                                        <label>Note: </label>
                                        <input
                                            type="text"
                                            name="note"
                                            value={selectedProfile.note || ""}
                                            onChange={handleChange}
                                            className="form-control w-100 "
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-success me-3">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedProfile(null)}
                                >
                                    Cancel
                                </button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="submit"
                                className="btn btn-success d-inline-block"
                                onClick={handleCloseModal1}
                            >
                                Complete
                            </button>
                        </Modal.Footer>
                    </Modal>
                )}
                {issuingProfile && (
                    <Modal show={modal2Show} onHide={handleCloseModal2} id="form_add">
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Issue Medication to {issuingProfile.name}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h1 className="modal-title fs-5 mb-2" id="exampleModalLabel">
                                Detail Medicine:
                            </h1>
                            <form onSubmit={handleMedicationIssue}>
                                {medicationEntries.map((entry, index) => (
                                    <div key={index}>
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="w-50">
                                                <label>Medication:</label>
                                                <select
                                                    value={entry.id}
                                                    onChange={(e) =>
                                                        handleMedicationChange(index, "id", e.target.value)
                                                    }
                                                    className="form-select"
                                                >
                                                    <option value="">Select Medication</option>
                                                    {medications.map((med) => (
                                                        <option key={med.id} value={med.id}>
                                                            {med.id}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="me-5">
                                                <label>Batch Number:</label>
                                                <select
                                                    value={entry.batchNumber}
                                                    onChange={(e) =>
                                                        handleMedicationChange(
                                                            index,
                                                            "batchNumber",
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={!entry.id}
                                                    className="form-select w-100"
                                                >
                                                    <option value="">Select Batch</option>
                                                    {entry.id &&
                                                        medications
                                                            .find((med) => med.id === entry.id)
                                                            .batches.map((batch) => (
                                                                <option
                                                                    key={batch.batchNumber}
                                                                    value={batch.batchNumber}
                                                                >
                                                                    {batch.batchNumber}
                                                                </option>
                                                            ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="d-flex ">
                                            <div className="w-50 me-4">
                                                <label>Quantity:</label>
                                                <input
                                                    type="number"
                                                    value={entry.quantity}
                                                    onChange={(e) =>
                                                        handleMedicationChange(
                                                            index,
                                                            "quantity",
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    className="form-control w-100"
                                                />
                                            </div>

                                            {remainingQuantity[index] !== undefined && (
                                                <p>Remaining Quantity: {remainingQuantity[index]}</p>
                                            )}
                                            <div style={{ width: "40%" }}>
                                                <label>Manual:</label>
                                                <input
                                                    type="text"
                                                    value={entry.manual}
                                                    onChange={(e) =>
                                                        handleMedicationChange(
                                                            index,
                                                            "manual",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="form-control w-100"
                                                />
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                ))}
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={handleAddMedication}
                                        className="btn btn-info me-3"
                                    >
                                        Add Medication
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIssuingProfile(null)}
                                        className="btn btn-secondary"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <br />
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success">
                                        Issue Medication
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="submit"
                                className="btn btn-success d-inline-block"
                                onClick={handleCloseModal2}
                            >
                                Complete
                            </button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </>
    );
};

export default ListPatient;
