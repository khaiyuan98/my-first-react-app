// https://www.youtube.com/watch?v=27KeYk-5vJw

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useRefreshToken } from "../hooks/useRefreshToken"
import { Outlet } from "react-router-dom";



const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        !auth?.AccessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`authToken: ${JSON.stringify(auth)}`);
    }, [isLoading]);


    return (
        <div>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />}
        </div>
    )
}

export default PersistLogin;