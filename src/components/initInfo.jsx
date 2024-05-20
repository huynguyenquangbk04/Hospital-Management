import React, { useState } from 'react';
import style from './../css/doctor-form-style.module.css';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from './../firebase-config';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/Auth';

const InitInformation = () => {
    const { user } = UserAuth();

    const [formData, setFormData] = useState({

        name: '',
        gender: '',
        birthday: '',
        address: '',
        idv: '',
        insuranceID: '',
        mobileNumber: '',
        role: '',
        uid: user?.uid

    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidPhoneNumber(formData.mobileNumber)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            const docRef = doc(db, 'info', formData.idv.trim());
            await setDoc(docRef, { ...formData });
            console.log('Document written with ID: ', docRef.id);
            setFormData({
                name: '',
                gender: '',
                birthday: '',
                address: '',
                idv: '',
                insuranceID: '',
                mobileNumber: '',
                role: ''
            });

            switch (formData.role) {
                case 'Patient':
                    navigate(`/patient/${formData.idv}`);
                    break;
                case 'Doctor':
                    navigate(`/doctor/${formData.idv}`);
                    break;
                case 'Manager':
                    navigate("/VerifyEmployee");
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <body className={style.doctorform}>
            <div className={`${style.container} ${style.doctorform}`}>
                <header className={style.doctorform}>Registration</header>

                <form onSubmit={handleSubmit}>
                    <div className={`form first`}>
                        <div className={`${style.detail} personal`}>
                            <span className={style.title}>NEW USER INFOMATION</span>

                            <div className={style.fields}>
                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Full Name <span>*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Gender <span>*</span></label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Date Of Birth <span>*</span></label>
                                    <input
                                        type="date"
                                        name="birthday"
                                        value={formData.birthday}
                                        onChange={handleInputChange}
                                        placeholder="Enter your Birthday"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Address <span>*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Enter your address"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">ID <span>*</span></label>
                                    <input
                                        type="text"
                                        name="idv"
                                        value={formData.idv}
                                        onChange={handleInputChange}
                                        placeholder="Enter your ID verification"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Mobile Number <span>*</span></label>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Health Insurance <span>*</span></label>
                                    <input
                                        type="text"
                                        name="insuranceID"
                                        value={formData.insuranceID}
                                        onChange={handleInputChange}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>

                                <div className={style[`input-field`]}>
                                    <label htmlFor="">Role <span>*</span></label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select your role</option>
                                        <option value="Patient">Patient</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.button}>
                        <button type="submit" className={style.summitBtn}>
                            <span className={style[`summit-btn`]}>Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        </body>
    );
};

export default InitInformation;