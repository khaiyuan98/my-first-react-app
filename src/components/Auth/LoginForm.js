// https://www.youtube.com/watch?v=OUP-urBy1k4&list=PLlameCF3cMEtY5S-9aVlCobcfDdbmpjPa&index=2

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const LoginForm = () => {
    const LOGIN_URL = '/auth/login';

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [submitError, setSubmitError] = useState('');

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();

        let isError = false;
        setUsernameError('');
        setPasswordError('');
        setSubmitError('');

        if (username.length <= 0) {
            setUsernameError("Username is required");
            isError = true;
        }

        if (password.length <= 0) {
            setPasswordError("Password is required");
            isError = true;
        }

        if (isError) {
            return;
        }

        axios.post(LOGIN_URL, {
            username: username,
            password: password,
        }, { withCredentials: true })
            .then(response => {
                const authUser = response.data;
                setAuth(authUser);
                navigate(from, { replace: true })

            })
            .catch(function (error) {
                if (!error?.response) {
                    setSubmitError('No Server Response');
                }
                else if (error.response.status === 400) {
                    setSubmitError('Missing username or password');
                }
                else if (error.response.status === 401) {
                    setSubmitError('Invalid username or password');
                }
                else {
                    setSubmitError('Login Failed');
                }
            });
    };

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    return (
        <Box>
            <Paper
                elevation={1}
                sx={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Typography component="h1" variant="body1" color="error">
                    {submitError}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        helperText={usernameError}
                        error={usernameError.length > 0 ? true : false}
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={passwordError}
                        error={passwordError.length > 0 ? true : false}

                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" onChange={(e) => setPersist(e.target.checked)} checked={persist} />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Box>
    )

}