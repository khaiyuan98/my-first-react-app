// https://www.youtube.com/watch?v=OUP-urBy1k4&list=PLlameCF3cMEtY5S-9aVlCobcfDdbmpjPa&index=2

import { useState } from "react";
import axios from "../api/axios";
import { Navigate } from "react-router-dom";

export const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [redirect, setRedirect] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('/auth/login', {
            username: username,
            password: password,
        })
        .then(response => {
            localStorage.setItem("accessToken", response.data);
            props.setAuthenticated(true);
            // setRedirect(true);

        })
        .catch(function (error) {
            if (error.response.status === 401) {
                alert('Invalid username or password');
            }
            else
            {
                alert('Server error');
            }
        });
    };

    // if (redirect)
    //     return <Navigate to="/"/>

    return (
        <form onSubmit={submitHandler}>
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