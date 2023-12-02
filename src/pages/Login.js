// https://www.youtube.com/watch?v=OUP-urBy1k4&list=PLlameCF3cMEtY5S-9aVlCobcfDdbmpjPa&index=2

import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from 'react-router-dom';

export const Login = () => {
    const LOGIN_URL = '/auth/login';
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(LOGIN_URL, {
            username: username,
            password: password,
        }, {withCredentials: true})
        .then(response => {
            const authUser = response.data;
            setAuth(authUser);
            navigate(from, { replace: true })

        })
        .catch(function (error) {
            if (!error?.response)
            {
                console.log('No Server Response');
            }
            else if (error.response.status === 400) {
                console.log('Missing username or password');
            }
            else if (error.response.status === 401) {
                console.log('Invalid username or password');
            }
            else
            {
                console.log('Login Failed');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
            </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    )
}