// https://www.youtube.com/watch?v=oUZjO00NkhY

import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        !auth?.AccessToken
            ? <Navigate to="/login" state={{ from: location }} replace />
            : <Outlet />
    );
};

export default RequireAuth;