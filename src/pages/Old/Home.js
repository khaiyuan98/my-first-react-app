import { useEffect, useState } from "react";
import axios from "../../api/axios";

export const Home = () => {
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
