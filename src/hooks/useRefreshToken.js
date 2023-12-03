// https://www.youtube.com/watch?v=nI8PYZNFtac
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
import axios from '../api/axios';

export const useRefreshToken = () => {
    const REFRESH_URL = '/auth/refresh';

    const navigate = useNavigate();
    const location = useLocation();

    const { setAuth } = useAuth();

    const refresh = async () => {
        try {

            const response = await axios.post(REFRESH_URL, {}, {
                withCredentials: true
            });

            setAuth(response.data);

            return response.data;
        }
        catch (error)
        {
            navigate('/login', { state: {from: location} });
        }
    }

    return refresh;
}