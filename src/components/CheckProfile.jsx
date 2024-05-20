import React, { useEffect, useState } from 'react';
import style from './../css/doctor-form-style.module.css';
import { doc, getDocs, updateDoc, collection, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [editProfile, setEditProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async (uid) => {
            try {
                // Find the document that contains the specified UID
                const querySnapshot = await getDocs(collection(db, 'info'));
                let foundNationalID = null;

                querySnapshot.forEach((doc) => {
                    if (doc.data().uid === uid) {
                        foundNationalID = doc.id;
                    }
                });

                if (foundNationalID) {
                    // Fetch the document using the national ID
                    const docRef = doc(db, 'info', foundNationalID);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserProfile({ id: foundNationalID, ...docSnap.data() });
                    } else {
                        console.log('No such document!');
                    }
                } else {
                    console.log('UID not found!');
                }
            } catch (err) {
                console.error('Error fetching document:', err);
                setError('Error fetching user profile.');
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserProfile(user.uid);
            } else {
                setError('No user is logged in.');
            }
        });
    }, []);

    const handleEditClick = () => {
        setEditProfile(userProfile);
    };

    const handleSave = async (updatedProfile) => {
        try {
            const profileRef = doc(db, 'info', updatedProfile.id);
            await updateDoc(profileRef, updatedProfile);
            setUserProfile(updatedProfile);
            setEditProfile(null);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Error updating profile.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(editProfile);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {editProfile ? (
                <body className={style.doctorform}>
                    <div className={`${style.container} ${style.doctorform}`}>
                        <header className={style.doctorform}>Registration</header>
                        <form onSubmit={handleSubmit}>
                            <div className={`form first`}>
                                <div className={`${style.detail} personal`}>
                                    <span className={style.title}>Edit Profile</span>

                                    <div className={style.fields}>
                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Full Name <span>*</span></label>
                                            <input type="text" name="name" value={editProfile.name} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Gender <span>*</span></label>
                                            <input type="text" name="gender" value={editProfile.gender} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Date Of Birth <span>*</span></label>
                                            <input type="text" name="birthday" value={editProfile.birthday} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Address <span>*</span></label>
                                            <input type="text" name="address" value={editProfile.address} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Health Insurance <span>*</span></label>
                                            <input type="text" name="insuranceID" value={editProfile.insuranceID} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Past Medical Conditions <span>*</span></label>
                                            <input type="text" name="pastMedicalConditions" value={editProfile.pastMedicalConditions} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Surgical History <span>*</span></label>
                                            <input type="text" name="surgicalHistory" value={editProfile.surgicalHistory} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Vaccination History <span>*</span></label>
                                            <input type="text" name="vaccinationHistory" value={editProfile.vaccinationHistory} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Allergies <span>*</span></label>
                                            <input type="text" name="allergies" value={editProfile.allergies} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">List of Current Medications <span>*</span></label>
                                            <input type="text" name="currentMedicationsUsed" value={editProfile.currentMedicationsUsed} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Describe your Lifestyle <span>*</span></label>
                                            <input type="text" name="decribelifeStyle" value={editProfile.decribelifeStyle} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Predict Medical Department <span>*</span></label>
                                            <input type="text" name="predictmedicaldepartment" value={editProfile.predictmedicaldepartment} onChange={handleChange} />
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Describe your Symptoms and Complaints <span>*</span></label>
                                            <input type="text" name="symptoms" value={editProfile.symptoms} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.button}>
                                <button type="submit" className={style.summitBtn} style={{ margin: "0 5px" }}>
                                    <span className={style[`summit-btn`]}>Save</span>
                                </button>
                                <button type="submit" className={style.summitBtn} style={{ margin: "0 5px" }} onClick={() => setEditProfile(null)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </body>
            ) : (
                <body className={style.doctorform}>
                    <div className={`${style.container} ${style.doctorform}`}>
                        <header className={style.doctorform}>User Profile</header>

                        <form>
                            <div className={`form first`}>
                                <div className={`${style.detail} personal`}>
                                    <h4 style={{ fontSize: "20px", fontWeight: "600" }}>User's Information</h4>

                                    <div className={style.fields}>
                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Full Name <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.name}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Gender <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.gender}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Date Of Birth <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.birthday}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Address <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.address}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Health Insurance <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.insuranceID}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Past Medical Conditions <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.pastMedicalConditions}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Surgical History <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.surgicalHistory}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Vaccination History <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.vaccinationHistory}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Allergies <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.allergies}
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <h4 style={{ fontSize: "20px", fontWeight: "600" }}>Diagnostic And Clinic Informations</h4>
                                    <div className={style.fields}>
                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">List of Current Medications <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.currentMedicationsUsed}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Describe your Lifestyle <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.decribelifeStyle}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Predict Medical Department <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.predictmedicaldepartment}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Describe your Symptoms and Complaints <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.symptoms}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Department <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.department}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">ID <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.id}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">IDV <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.idv}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Role <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.role}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Physical Examination <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.physicalExamination}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Diagnostic Tests <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.diagnosticTests}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Assessment and Plan <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.assessmentAndPlan}
                                            </div>
                                        </div>

                                        <div className={style[`input-field`]}>
                                            <label htmlFor="">Note <span>*</span></label>
                                            <div style={{
                                                border: '2px solid rgba(0, 0, 0, 0.2)',
                                                padding: '5px',
                                                borderRadius: '4px'
                                            }}>
                                                {userProfile.note}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`form first`}>
                                <div className={`${style.detail} personal`}>
                                    <h4 style={{ fontSize: "20px", fontWeight: "600" }}>Prescribed Medications</h4>
                                    <table className='table table-bordered' style={{ textAlign: "center" }}>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Batch Number</th>
                                                <th scope='col'>Expiration Date</th>
                                                <th scope='col'>Manual</th>
                                                <th scope='col'>Medication ID</th>
                                                <th scope='col'>Quantity</th>
                                                <th scope='col'>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userProfile.prescribedMedications && userProfile.prescribedMedications.map((med, index) => (
                                                <tr key={index}>
                                                    <td>{med.batchNumber}</td>
                                                    <td>{med.expirationDate}</td>
                                                    <td>{med.manual}</td>
                                                    <td>{med.medicationId}</td>
                                                    <td>{med.quantity}</td>
                                                    <td>{med.role}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className={`form first`}>
                                <div className={`${style.detail} personal`}>
                                    <h4 style={{ fontSize: "20px", fontWeight: "600" }}>Equipment</h4>
                                    <table className='table table-bordered' style={{ textAlign: "center" }}>
                                        <thead>
                                            <tr>
                                                <th scope='col'>Equipment ID</th>
                                                <th scope='col'>Maintenance History</th>
                                                <th scope='col'>Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userProfile.equipments && userProfile.equipments.map((equipment, index) => (
                                                <tr key={index}>
                                                    <td>{equipment.equipmentId}</td>
                                                    <td>{equipment.maintenanceHistory}</td>
                                                    <td>{equipment.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className={style.button}>
                                <button type="submit" className={style.summitBtn} onClick={handleEditClick}>
                                    <span className={style[`summit-btn`]}>Edit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </body>
                // <div>
                //     <p>Name: {userProfile.name}</p>
                //     <p>Gender: {userProfile.gender}</p>
                //     <p>Date of Birth: {userProfile.birthday}</p>
                //     <p>Address: {userProfile.address}</p>
                //     <p>Health Insurance: {userProfile.insuranceID}</p>
                //     <p>Past Medical Conditions: {userProfile.pastMedicalConditions}</p>
                //     <p>Surgical History: {userProfile.surgicalHistory}</p>
                //     <p>Vaccination History: {userProfile.vaccinationHistory}</p>
                //     <p>Allergies: {userProfile.allergies}</p>
                //     <p>List of Current Medications: {userProfile.currentMedicationsUsed}</p>
                //     <p>Describe your Lifestyle: {userProfile.decribelifeStyle}</p>
                //     <p>Predict Medical Department: {userProfile.predictmedicaldepartment}</p>
                //     <p>Describe your Symptoms and Complaints: {userProfile.symptoms}</p>
                //     <p>Department: {userProfile.department}</p>
                //     <p>ID: {userProfile.id}</p>
                //     <p>IDV: {userProfile.idv}</p>
                //     <p>Role: {userProfile.role}</p>
                //     <p>Physical Examination: {userProfile.physicalExamination}</p>
                //     <p>Diagnostic Tests: {userProfile.diagnosticTests}</p>
                //     <p>Assessment and Plan: {userProfile.assessmentAndPlan}</p>
                //     <p>Note: {userProfile.note}</p>
                //     <h2>Prescribed Medications:</h2>
                //     {userProfile.prescribedMedications && userProfile.prescribedMedications.map((med, index) => (
                //         <div key={index}>
                //             <p>Batch Number: {med.batchNumber}</p>
                //             <p>Expiration Date: {med.expirationDate}</p>
                //             <p>Manual: {med.manual}</p>
                //             <p>Medication ID: {med.medicationId}</p>
                //             <p>Quantity: {med.quantity}</p>
                //             <p>Role: {med.role}</p>
                //         </div>
                //     ))}
                //     <h2>Equipment:</h2>
                //     {userProfile.equipments && userProfile.equipments.map((equipment, index) => (
                //         <div key={index}>
                //             <p>Equipment ID: {equipment.equipmentId}</p>
                //             <p>Maintenance History: {equipment.maintenanceHistory}</p>
                //             <p>Name: {equipment.name}</p>
                //         </div>
                //     ))}
                //     <button onClick={handleEditClick}>Edit</button>
                // </div>
            )}
        </div>
    );
};

export default UserProfile;
