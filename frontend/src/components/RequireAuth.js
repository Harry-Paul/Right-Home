import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = (id) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    console.log(location)
    console.log(auth.email)

    return (
        auth?.email
            ?<Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;