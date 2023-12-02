import { Alert, Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const Unauthorized = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Box>
            <Alert severity="error">UNAUTHORIZED!</Alert>
            <Typography variant="h4">You do not have access to this page.</Typography>

            <Box marginTop={'10px'}>
                <Button
                color="info"
                    variant="contained"
                    onClick={goBack}
                >
                    Go Back
                </Button>
            </Box>
        </Box>
    )
}