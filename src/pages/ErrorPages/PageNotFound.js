import { Alert, Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const PageNotFound = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Box>
            <Alert severity="error">Page Not Found!</Alert>
            <Typography variant="h4">The page you requested does not exist.</Typography>

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