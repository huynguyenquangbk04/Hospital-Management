import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    getDoc,
} from "firebase/firestore";
import Patient_css from "./../css/patient.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import HeaderPage from "./header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
const MedicineManager = () => {
    const [medicines, setMedicines] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [formData, setFormData] = useState({});
    const [newBatch, setNewBatch] = useState({});
    const [alerts, setAlerts] = useState({
        lowStock: [],
        nearExpiry: [],
        expired: [],
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMedicineForBatch, setSelectedMedicineForBatch] = useState("");
    const [newMedicineName, setNewMedicineName] = useState("");

    useEffect(() => {
        const fetchMedicines = async () => {
            const medicinesCollection = collection(db, "medicines");
            const medicinesSnapshot = await getDocs(medicinesCollection);
            const medicinesList = medicinesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMedicines(medicinesList);

            // Alert logic
            const lowStock = [];
            const nearExpiry = [];
            const expired = [];
            const currentDate = new Date();

            medicinesList.forEach((medicine) => {
                if (medicine.batches && Array.isArray(medicine.batches)) {
                    medicine.batches.forEach((batch) => {
                        const expirationDate = new Date(batch.expirationDate);
                        const productionDate = new Date(batch.productionDate);
                        const daysToExpiry =
                            (expirationDate - currentDate) / (1000 * 60 * 60 * 24);
                        const totalDays =
                            (expirationDate - productionDate) / (1000 * 60 * 60 * 24);

                        if (batch.quantityInOut < batch.minimumInventory) {
                            lowStock.push({ ...batch, medicineId: medicine.id });
                        }
                        if (daysToExpiry <= totalDays * 0.1) {
                            nearExpiry.push({ ...batch, medicineId: medicine.id });
                        }
                        if (expirationDate < currentDate) {
                            expired.push({ ...batch, medicineId: medicine.id });
                        }
                    });
                }
            });

            setAlerts({ lowStock, nearExpiry, expired });
        };

        fetchMedicines();
    }, []);
    const [modal1Show_, setModal1Show_] = useState(false);
    const [modal2Show_, setModal2Show_] = useState(false);

    const handleOpenModal1 = () => setModal1Show_(true);
    const handleCloseModal1 = () => setModal1Show_(false);

    const handleOpenModal2 = () => setModal2Show_(true);
    const handleCloseModal2 = () => setModal2Show_(false);

    const handleEdit = (medicineId, batch, batchIndex) => {
        handleOpenModal2();
        setSelectedBatch({ medicineId, batchIndex });
        setFormData({ ...batch });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleNewBatchChange = (e) => {
        const { name, value } = e.target;
        setNewBatch((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBatchChange = (e, batchIndex) => {
        const { name, value } = e.target;
        const updatedBatches = formData.batches.map((batch, index) => {
            if (index === batchIndex) {
                return {
                    ...batch,
                    [name]: value,
                };
            }
            return batch;
        });
        setFormData((prevState) => ({
            ...prevState,
            batches: updatedBatches,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { medicineId, batchIndex } = selectedBatch;
        const medicineDoc = doc(db, "medicines", medicineId);
        const medicineSnapshot = await getDoc(medicineDoc);
        const medicineData = medicineSnapshot.data();
        const updatedBatches = medicineData.batches.map((batch, index) =>
            index === batchIndex ? formData : batch
        );
        await updateDoc(medicineDoc, { batches: updatedBatches });
        setSelectedBatch(null);
        setFormData({});
    };

    const handleAddNewBatchToExistingMedicine = async (e) => {
        e.preventDefault();

        if (!selectedMedicineForBatch && !newMedicineName) {
            alert("Please select an existing medicine or enter a new medicine name.");
            return;
        }

        // Validation
        const currentDate = new Date();
        const productionDate = new Date(newBatch.productionDate);
        const expirationDate = new Date(newBatch.expirationDate);
        if (
            productionDate >= currentDate ||
            expirationDate <= currentDate ||
            productionDate >= expirationDate
        ) {
            alert(
                "Invalid batch dates. Please check the production and expiration dates."
            );
            return;
        }

        let medicineDoc;
        if (selectedMedicineForBatch) {
            medicineDoc = doc(db, "medicines", selectedMedicineForBatch);
            const medicineSnapshot = await getDoc(medicineDoc);
            const medicineData = medicineSnapshot.data();
            const updatedBatches = [...medicineData.batches, newBatch];
            await updateDoc(medicineDoc, { batches: updatedBatches });
        } else {
            medicineDoc = doc(db, "medicines", newMedicineName);
            await setDoc(medicineDoc, { batches: [newBatch] });
        }

        // Reset form
        setSelectedMedicineForBatch("");
        setNewMedicineName("");
        setNewBatch({});
        // Refresh the medicines list
        const medicinesCollection = collection(db, "medicines");
        const medicinesSnapshot = await getDocs(medicinesCollection);
        const medicinesList = medicinesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMedicines(medicinesList);
    };

    const handleDeleteMedicine = async (medicineId) => {
        await deleteDoc(doc(db, "medicines", medicineId));
        // Refresh the medicines list
        const medicinesCollection = collection(db, "medicines");
        const medicinesSnapshot = await getDocs(medicinesCollection);
        const medicinesList = medicinesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMedicines(medicinesList);
    };

    const handleDeleteBatch = async (medicineId, batchIndex) => {
        const medicineDoc = doc(db, "medicines", medicineId);
        const medicineSnapshot = await getDoc(medicineDoc);
        const medicineData = medicineSnapshot.data();
        const updatedBatches = medicineData.batches.filter(
            (batch, index) => index !== batchIndex
        );
        await updateDoc(medicineDoc, { batches: updatedBatches });
        // Refresh the medicines list
        const medicinesCollection = collection(db, "medicines");
        const medicinesSnapshot = await getDocs(medicinesCollection);
        const medicinesList = medicinesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMedicines(medicinesList);
    };

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <HeaderPage />
            <div className="container">
                <h1 className="text-center mt-3">Medicine Manager</h1>
                <div className="warning mb-3">
                    <h2 className="text-warning">**Alerts: </h2>
                    <div className="d-flex justify-content-around">
                        <div className="warning_item position-relative">
                            <h3>Low Stock</h3>
                            <ul>
                                {alerts.lowStock.map((batch, index) => (
                                    <li key={index}>
                                        {batch.medicineId}: Batch {batch.batchNumber} is low on
                                        stock.
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="warning_item">
                            <h3>Near Expiry</h3>
                            <ul>
                                {alerts.nearExpiry.map((batch, index) => (
                                    <li key={index}>
                                        {batch.medicineId}: Batch {batch.batchNumber} is near
                                        expiry.
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Expired</h3>
                            <ul>
                                {alerts.expired.map((batch, index) => (
                                    <li key={index}>
                                        {batch.medicineId}: Batch {batch.batchNumber} has expired.
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="w-75 mx-auto mb-4"></hr>

                <div className="container mb-5">
                    <h3>Medicine List</h3>
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="primary"
                            onClick={handleOpenModal1}
                            className="btn btn-success"
                        >
                            + Add New Medicine
                        </Button>
                        <div>
                            <label>Search Medicine:</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </div>

                    <Modal show={modal1Show_} onHide={handleCloseModal1}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Add New Batch to Existing or New Medicine
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleAddNewBatchToExistingMedicine}>
                                <label>Select Existing Medicine:</label>
                                <select
                                    value={selectedMedicineForBatch}
                                    onChange={(e) => setSelectedMedicineForBatch(e.target.value)}
                                    className="form-select w-50 mb-3"
                                >
                                    <option value="">Select a medicine</option>
                                    {medicines.map((medicine) => (
                                        <option key={medicine.id} value={medicine.id}>
                                            {medicine.id}
                                        </option>
                                    ))}
                                </select>

                                <label>Or Enter New Medicine Name:</label>
                                <input
                                    type="text"
                                    value={newMedicineName}
                                    onChange={(e) => setNewMedicineName(e.target.value)}
                                    disabled={selectedMedicineForBatch !== ""}
                                    className="form-control w-50 mb-3"
                                />

                                <div>
                                    <h3>New Batch Details</h3>
                                    <label>Batch Number:</label>
                                    <input
                                        type="text"
                                        name="batchNumber"
                                        value={newBatch.batchNumber || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Production Date:</label>
                                    <input
                                        type="date"
                                        name="productionDate"
                                        value={newBatch.productionDate || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Expiration Date:</label>
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={newBatch.expirationDate || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Manufacturer:</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={newBatch.manufacturer || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Minimum Inventory:</label>
                                    <input
                                        type="number"
                                        name="minimumInventory"
                                        value={newBatch.minimumInventory || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Quantity:</label>
                                    <input
                                        type="number"
                                        name="quantityInOut"
                                        value={newBatch.quantityInOut || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Unit:</label>
                                    <input
                                        type="text"
                                        name="unit"
                                        value={newBatch.unit || ""}
                                        onChange={handleNewBatchChange}
                                        className="form-control w-50 mb-3"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Add Batch to Medicine
                                </button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                type="submit"
                                className="btn btn-success d-inline-block"
                                onClick={handleCloseModal1}
                            >
                                Save Medicine
                            </button>
                        </Modal.Footer>
                    </Modal>
                    <div className={Patient_css.patient_list_content}>
                        <table className={`table ${Patient_css.table}`}>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Batch order</th>
                                    <th scope="col">Batch Number</th>
                                    <th scope="col">Production Date</th>
                                    <th scope="col">Expiration Date</th>
                                    <th scope="col">Manufacturer</th>
                                    <th scope="col">Minimum Inventory</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Edit</th>
                                    <th scope="col">Delete batch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.length > 0 ? (
                                    medicines.map((medicine) => (
                                        <React.Fragment key={medicine.id}>
                                            {medicine.batches && medicine.batches.length > 0 ? (
                                                medicine.batches.map((batch, index) => (
                                                    <tr key={batch.batchNumber}>
                                                        {index === 0 && (
                                                            <td rowSpan={medicine.batches.length}>
                                                                {medicine.id}
                                                            </td>
                                                        )}
                                                        <td>{index + 1}</td>
                                                        <td>{batch.batchNumber}</td>
                                                        <td>{batch.productionDate}</td>
                                                        <td>{batch.expirationDate}</td>
                                                        <td>{batch.manufacturer}</td>
                                                        <td>{batch.minimumInventory}</td>
                                                        <td>{batch.quantityInOut}</td>
                                                        <td>{batch.unit}</td>
                                                        <td id={Patient_css.trash_bin}>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faEdit}
                                                                    onClick={() =>
                                                                        handleEdit(medicine.id, batch, index)
                                                                    }
                                                                    className="text-success"
                                                                />
                                                            </a>
                                                        </td>
                                                        <td id={Patient_css.trash_bin}>
                                                            <a href="#">
                                                                <FontAwesomeIcon
                                                                    icon={faTrash}
                                                                    onClick={() =>
                                                                        handleDeleteBatch(medicine.id, index)
                                                                    }
                                                                />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td>{medicine.id}</td>
                                                    <td colSpan="8">No batch data available</td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9">No medicines available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {selectedBatch && (
                        <Modal show={modal2Show_} onHide={handleCloseModal2}>
                            <Modal.Header closeButton>
                                <Modal.Title>Equipment Editting</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={handleSubmit}>
                                    <h2>Edit Batch {selectedBatch.batchIndex + 1}</h2>
                                    <label>Batch Number:</label>
                                    <input
                                        type="text"
                                        name="batchNumber"
                                        value={formData.batchNumber}
                                        onChange={handleChange}
                                        className="form-control w-25 p-3"
                                    />

                                    <label>Production Date:</label>
                                    <input
                                        type="date"
                                        name="productionDate"
                                        value={formData.productionDate}
                                        onChange={handleChange}
                                        className="form-control w-25 mb-3"
                                    />

                                    <label>Expiration Date:</label>
                                    <input
                                        type="date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        onChange={handleChange}
                                        className="form-control w-25 mb-3"
                                    />

                                    <label>Manufacturer:</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={formData.manufacturer}
                                        onChange={handleChange}
                                        className="form-control w-50 mb-3"
                                    />

                                    <label>Minimum Inventory:</label>
                                    <input
                                        type="number"
                                        name="minimumInventory"
                                        value={formData.minimumInventory}
                                        onChange={handleChange}
                                        className="form-control w-25 mb-3"
                                    />

                                    <label>Quantity :</label>
                                    <input
                                        type="number"
                                        name="quantityInOut"
                                        value={formData.quantityInOut}
                                        onChange={handleChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <label>Unit:</label>
                                    <input
                                        type="text"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleChange}
                                        className="form-control w-50 mb-3"
                                    />
                                    <button type="submit" className="btn btn-success">
                                        Save
                                    </button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    type="submit"
                                    className="btn btn-success d-inline-block"
                                    onClick={handleCloseModal2}
                                >
                                    Save editting
                                </button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </div>
            </div>
        </>
    );
};

export default MedicineManager;
