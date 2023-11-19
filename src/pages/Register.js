import React, { useState } from "react";
import axios from './../api/axios';
import {Navigate} from 'react-router-dom';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('/user/register', {
            username: username,
            password: password,
            email: email
        }).then(response => {
            alert('Success');
            setRedirect(true);
        });  
    };

    if (redirect)
        return <Navigate to="/login"/>

    return (
        <form onSubmit={submitHandler}>
            <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">Register</h1>

            <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
            <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <label for="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">
                Remember me
            </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
        </form>
    )
}