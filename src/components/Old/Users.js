import {useState} from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export const Users = () => {
    const axios = useAxiosPrivate();

    const [users, setUsers] = useState();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        
        const getUsers = async () => {
            try
            {
                const response = await axios.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    },[]);

    return (
    <article>
        <h2>Users List</h2>
        {users?.length ? (
        <ul>
            {users.map((user,i) => <li key={i}>{user?.username}</li>)}
        </ul>
        ) : <p>No users to display</p>
    }
    </article>)
};

