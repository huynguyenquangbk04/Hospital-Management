import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/Auth';
import Signup_css from './../css/signup.module.css';
import backgroundImage from './../img/background_BK.jpg';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { signIn, createUser } = UserAuth();

    const handleSubmitSignIn = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signIn(email, password);
            navigate('/checkprofile');
        } catch (e) {
            setError(e.message);
            alert(e.message);
            console.log(e.message);
        }
    };

    const handleSubmitSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/initInformation');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };

    const handleEmployeeClick = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signIn(email, password);
            navigate('/VerifyEmployee');
        } catch (e) {
            setError(e.message);
            alert(e.message);
            console.log(e.message);
        }
    };

    return (
        <body className={Signup_css.signup}>
            <div className={Signup_css.content}>
                <div className="img">
                    <img src={backgroundImage} alt="Background" />
                </div>
                <div className={Signup_css.main}>
                    <input type="checkbox" id={Signup_css.chk} aria-hidden="true" />
                    <div className={Signup_css.main_signup}>
                        <form onSubmit={handleSubmitSignUp}>
                            <label htmlFor={Signup_css.chk} aria-hidden="true">SIGN UP</label>
                            <div className="underline"></div>
                            <div className={Signup_css.inputs}>
                                <div className={Signup_css.emailicon}>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email ..." required />
                                </div>
                                <div className={Signup_css.pwdicon}>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password ..." required />
                                </div>
                            </div>
                            <button type="submit">SignUp</button>
                        </form>
                    </div>
                    <div className={Signup_css.login}>
                        <form onSubmit={handleSubmitSignIn}>
                            <label htmlFor={Signup_css.chk} aria-hidden="true">LOG IN</label>
                            <div className={Signup_css.inputs}>
                                <div className={Signup_css.usericon}>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email ..." required />
                                </div>
                                <div className={Signup_css.emailicon}>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Password ..." required />
                                </div>
                            </div>
                            <div className={Signup_css.signin}>
                                <button type="submit">Click here if you are our patient</button>
                                <button type="button" onClick={handleEmployeeClick}>Click here if you are our employee</button>
                            </div>
                        </form>
                        <div className={Signup_css.wrapper_}>
                            <div className={Signup_css[`forgot-password`]}>Fogot Password? <span>Click here!</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default SignUp;
