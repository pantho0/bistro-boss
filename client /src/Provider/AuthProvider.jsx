import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase.config";



export const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
        const [user, setUser] = useState([])
        const [loading, setLoading] = useState(true)


        const info ={
            user,
            loading
        }







    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;