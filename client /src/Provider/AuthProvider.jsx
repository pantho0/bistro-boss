import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";



export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
        const [user, setUser] = useState([])
        const [loading, setLoading] = useState(true)

        const createUser = (email, password) =>{
            return createUserWithEmailAndPassword(auth, email, password)

        }

        const signIn = (email, password) =>{
            return signInWithEmailAndPassword(auth, email, password)
        }

        const googleLogin = () =>{
            return signInWithPopup(auth, provider)
        }

        const logOut = () =>{
            return signOut(auth)
        }
 

        useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth, currentUser=>{
                if(currentUser){
                    console.log('Current Logged User', currentUser)
                    setLoading(false)
                }
            })
            return () =>{
                return unsubscribe()
            }
        },[])

        const info ={
            user,
            loading,
            createUser,
            signIn,
            logOut,
            googleLogin
        }

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;