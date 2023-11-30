import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import {Home} from '../../pages/Old/Home';
import {Department} from '../../pages/Old/Department';
import {Employee} from '../../pages/Old/Employee';
import { Login } from '../../pages/Old/Login';
import { Register } from '../../pages/Old/Register';
import axios from '../../api/axios';

export const TopNavBar = (props) => {

    const logout = () => {
        axios.post('/auth/logout', {}, {withCredentials: true})
        props.setAuthenticated(false);
    }

    let leftMenu;
    let rightMenu;

    if (props.user === null) {
        leftMenu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                        Home
                    </NavLink>
                </li>
            </ul>)

        rightMenu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <NavLink className="nav-link" to="/login">
                Sign In
            </NavLink>
        </ul>)
    }

    else {
    leftMenu = (
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
            <NavLink className="nav-link" to="/">
                Home
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/employee">
                Employee
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/department">
                Department
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link" to="/register">
                Register
            </NavLink>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
    </ul>)

        rightMenu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">           
            <li className="nav-item">
                <NavLink className="nav-link" onClick={logout}>
                    Logout
                </NavLink>
            </li>
        </ul>)
    }

    return (
    <BrowserRouter>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <a className="navbar-brand">Demo</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {leftMenu}
                </div>
                {rightMenu}
            </div>
        </nav>
        <div className="App container">
            <Routes>
                <Route path='/' exact element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/employee' element={<Employee/>}/>
                <Route path='/department' element={<Department/>}/>
            </Routes>
        </div>
    </BrowserRouter>
    )
    
}