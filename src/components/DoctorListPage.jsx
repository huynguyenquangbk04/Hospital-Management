// import React, { useState, useEffect } from 'react';
// import { db } from '../firebase-config';
// import { collection, getDocs, query, where, doc, updateDoc, setDoc } from "firebase/firestore";

// function PatientList() {
//     const [patients, setPatients] = useState([]);
//     const [searchId, setSearchId] = useState('');
//     const [selectedPatient, setSelectedPatient] = useState(null);
//     const [vitalSigns, setVitalSigns] = useState('');
//     const [diagnosis, setDiagnosis] = useState('');
//     const [labResults, setLabResults] = useState('');
//     const [medication, setMedication] = useState('');

//     useEffect(() => {
//         const fetchPatients = async () => {
//             const q = query(collection(db, 'info'),
//                 where('role', '==', '0'),
//                 where('department', '==', currentUserDepartment));
//             const querySnapshot = await getDocs(q);
//             const patientsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
//             setPatients(patientsData);
//         };

//         fetchPatients();
//     }, []);

//     const handleStatusChange = async (id, newStatus) => {
//         await updateDoc(doc(db, "info", id), { status: newStatus });
//         setSelectedPatient({ ...selectedPatient, status: newStatus });
//         setPatients(patients.map(patient => patient.id === id ? { ...patient, status: newStatus } : patient));
//     };

//     const openModal = (patient) => {
//         setSelectedPatient(patient);
//         // Load existing data if any
//         setVitalSigns(patient.vitalSigns || '');
//         setDiagnosis(patient.diagnosis || '');
//         setLabResults(patient.labResults || '');
//         setMedication(patient.medication || '');
//     };

//     const closeModal = () => {
//         setSelectedPatient(null);
//     };

//     const savePatientData = async () => {
//         if (selectedPatient) {
//             const data = {
//                 vitalSigns, diagnosis, labResults, medication
//             };
//             await updateDoc(doc(db, "info", selectedPatient.id), data);
//             setSelectedPatient({ ...selectedPatient, ...data });
//             setPatients(patients.map(patient => patient.id === selectedPatient.id ? { ...patient, ...data } : patient));
//             closeModal();
//         }
//     };

//     return (
//         <div>
//             <h1>Patient List</h1>
//             <input
//                 type="text"
//                 placeholder="Search by Department..."
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//             />
//             <ul>
//                 {patients.filter(patient => patient.id.includes(searchId)).map(patient => (
//                     <li key={patient.id}>
//                         {patient.name} - {patient.birthday} - {patient.mobileNumber}
//                         <button onClick={() => openModal(patient)}>Details</button>
//                     </li>
//                 ))}
//             </ul>

//             {selectedPatient && (
//                 <div style={{ position: "fixed", top: "10%", left: "20%", width: "60%", backgroundColor: "white", padding: "20px", zIndex: 100, borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.5)", overflowY: "auto" }}>
//                     <h2>Patient Details</h2>
//                     <p><strong>ID:</strong> {selectedPatient.id}</p>
//                     <p><strong>Name:</strong> {selectedPatient.name}</p>
//                     <p><strong>Birthday:</strong> {selectedPatient.birthday}</p>
//                     <p><strong>Mobile Number:</strong> {selectedPatient.mobileNumber}</p>
//                     <p><strong>Status:</strong>
//                         <select value={selectedPatient.status} onChange={(e) => handleStatusChange(selectedPatient.id, e.target.value)}>
//                             <option value="0">Chưa xác nhận hồ sơ</option>
//                             <option value="1">Đã xác nhận hồ sơ, đang đợi khám</option>
//                             <option value="2">Đang nhập viện</option>
//                             <option value="3">Đã xuất viện</option>
//                             <option value="99">Hồ sơ từ chối</option>
//                         </select>
//                     </p>
//                     <p>
//                         <strong>Vital Signs:</strong>
//                         <input type="text" value={vitalSigns} onChange={(e) => setVitalSigns(e.target.value)} />
//                     </p>
//                     <p>
//                         <strong>Diagnosis:</strong>
//                         <input type="text" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
//                     </p>
//                     <p>
//                         <strong>Laboratory Test Results:</strong>
//                         <input type="text" value={labResults} onChange={(e) => setLabResults(e.target.value)} />
//                     </p>
//                     <p>
//                         <strong>Medication Prescribed:</strong>
//                         <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} />
//                     </p>
//                     <button onClick={savePatientData}>Save</button>
//                     <button onClick={closeModal}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default PatientList;
