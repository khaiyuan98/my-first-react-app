import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const Home = () => {
    const axios = useAxiosPrivate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/auth/user').then(() => {
            setUser(user);
        });
    }, []);


    return (
    <div>
        {user?.Username ? `Hi ${user.Username}` : 'You are not logged in'}
    </div>
    )
};
