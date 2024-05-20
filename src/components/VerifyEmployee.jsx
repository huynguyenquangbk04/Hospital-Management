import React, { useState, useEffect } from 'react';
import style from './../css/doctor-form-style.module.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './../firebase-config';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './../context/Auth';

const VerifyEmployee = () => {
    const [formData, setFormData] = useState({
        key: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = UserAuth();

    useEffect(() => {
        if (!user || !user.uid) {
            setError('User not authenticated');
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.key === '1') {
            try {
                const q = query(collection(db, 'info'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    console.log('Document data:', userData);

                    const role = userData.role;
                    switch (role) {
                        case 'Manager':
                            navigate('/MedicalEquipmentManager');
                            break;
                        case 'Doctor':
                            navigate('/ListPatients');
                            break;
                        default:
                            setError('Unauthorized role');
                            break;
                    }
                } else {
                    setError('No such document!');
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
                setError('Error fetching document');
            }
        } else {
            alert('Invalid private key. Please try again.');
        }
    };

    return (
        <body className={style.doctorform}>
            <div className={`${style.container} ${style.doctorform}`}>
                <header className={style.doctorform}>VERIFY</header>

                <form onSubmit={handleSubmit}>
                    <div className={`form first`}>
                        <div className={`${style.detail} personal`}>
                            <span className={style.title}>Type Private Key to join your workspace</span>
                            {error && <p className={style.error}>{error}</p>}
                            <div className={style.fields}>
                                <div className={style[`input-field`]}>
                                    <label htmlFor=""><span>*</span></label>
                                    <input
                                        type="password"
                                        name="key"
                                        value={formData.key}
                                        onChange={handleInputChange}
                                        placeholder="Enter Private Key"
                                        required
                                    />
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

export default VerifyEmployee;
