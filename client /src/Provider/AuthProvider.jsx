import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../Hooks /useAxiosPublic";



export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
        const [user, setUser] = useState(null)
        const [loading, setLoading] = useState(true)
        const axiosPublic = useAxiosPublic()

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

        const profileUpdate = (name, photoUrl) =>{
            return updateProfile(auth.currentUser,{
                displayName: name, photoURL:photoUrl
            })
        }
        
        useEffect(()=>{
            const unsubscribe = onAuthStateChanged(auth, currentUser=>{
                setUser(currentUser)
                if(currentUser){
                    const userInfo = {email : currentUser.email}
                    axiosPublic.post('/jwt', userInfo)
                    .then(res =>{
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
                   
                }else{
                    localStorage.removeItem('access-token')
                }
                setLoading(false)
            })
            return () =>{
               unsubscribe()
            }
        },[axiosPublic])

        const info ={
            user,
            loading,
            createUser,
            signIn,
            logOut,
            googleLogin,
            profileUpdate
        }

        

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;