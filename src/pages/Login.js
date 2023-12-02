// https://www.youtube.com/watch?v=OUP-urBy1k4&list=PLlameCF3cMEtY5S-9aVlCobcfDdbmpjPa&index=2
import { Box } from '@mui/material';
import { LoginForm } from './../components/Auth/LoginForm';

export const Login = () => {
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <LoginForm />
        </Box>
    )
}