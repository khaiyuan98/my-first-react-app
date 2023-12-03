// https://www.youtube.com/watch?v=oUZjO00NkhY

import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const RequireRole = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('RequireRole')
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
        ? <Outlet />
        : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default RequireRole;