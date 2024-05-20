import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { db } from './../firebase-config';
import { auth } from './../firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const createUser = async (email, password, additionalData = {}) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userData = {
            email,
            uid: userCredential.user.uid,

        };
        // Store user data in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), userData);
        setUser(userData); // Update state
        return userCredential;
    };

    const signIn = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (userDoc.exists()) {
            setUser(userDoc.data()); // Update state
        } else {
            console.error('User does not exist in Firestore');
        }
        return userCredential;
    };

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    setUser(userDoc.data()); // Update state with Firestore data
                } else {
                    console.error('User does not exist in Firestore');
                }
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};
