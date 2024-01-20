import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";



export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null)
        const [loading, setLoading] = useState(true)

        const createUser = (email, password) =>{
            return createUserWithEmailAndPassword(auth, email, password)

        }

        const signIn = (email, password) =>{
            setLoading(true)
            return signInWithEmailAndPassword(auth, email, password)
        }

        const googleLogin = () =>{
            setLoading(true)  
            return signInWithPopup(auth, provider)
        }

        const logOut = () =>{
            setUser(null)
            return signOut(auth)
        }
        
        useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth, currentUser=>{
                if(currentUser){
                    setUser(currentUser)
                    
                }
                setLoading(false)
            })
            return () =>{
               unsubscribe()
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