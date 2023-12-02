// https://www.youtube.com/watch?v=oUZjO00NkhY

import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        !auth?.AccessToken
            ? <Navigate to="/login" state={{ from: location }} replace />
            : allowedRoles == undefined || allowedRoles.length <= 0 || auth?.roles?.find(role => allowedRoles?.includes(role))
                ? <Outlet />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default RequireAuth;