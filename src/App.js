import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignUp from './components/SignUp';
import InitInformation from './components/initInfo';
import Home from './components/HomePage';
import InforPatient from './components/InforPatient';
import InfoDoctor from './components/InfoDoctor';
import { AuthContextProvider } from './context/Auth';
import MedicalEquipmentManager from './components/ManageObject';
import MedicinesList from './components/MedicinesManagement';
import CheckProfile from './components/CheckProfile';
import ListPatients from './components/ListPatients';
import VerifyEmployee from './components/VerifyEmployee';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/initInformation" element={<InitInformation />} />
            <Route path="/home" element={<Home />} />
            <Route path="/patient/:idv" element={<InforPatient />} />
            <Route path="/doctor/:idv" element={<InfoDoctor />} />
            <Route path="/CheckProfile" element={<CheckProfile />} />
            <Route path="/MedicinesList" element={<MedicinesList />} />
            <Route path="/ListPatients" element={<ListPatients />} />
            <Route path="/VerifyEmployee" element={<VerifyEmployee />} />
            <Route path="/MedicalEquipmentManager" element={<MedicalEquipmentManager />} />
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
