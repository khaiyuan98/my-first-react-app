import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const LOGOUT_URL = '/auth/logout'
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            await axios.post(LOGOUT_URL, {}, {withCredentials: true});
        }
        catch (error){
            console.error(error);
        }
    }

    return logout;
}

export default useLogout;