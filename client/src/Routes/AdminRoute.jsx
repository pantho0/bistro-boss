import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks /useAdmin";
import useAuth from "../Hooks /useAuth";
import RingLoader from "react-spinners/RingLoader";


const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const {user, loading} = useAuth();

    const location = useLocation()

    if(loading || isAdminLoading){
     return <RingLoader color="#36d7b7" />
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>

};

export default AdminRoute;