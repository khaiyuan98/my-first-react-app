//https://www.youtube.com/watch?v=sTdt2cJS2dg

import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Create = () => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState('todos');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if (title == '') {
            setTitleError(true);
        }

        if (details == '') {
            setDetailsError(true);
        }

        if (title && details) {
            console.log(title, details, category);
            navigate('/');
        }
    }

    return (
        <Box>
            <Paper
                elevation={1}
                sx={{ padding: '20px' }}
            >
                <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    color="textSecondary">
                    Create a new Note
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}
                        label="Note Title"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                        error={titleError}
                    />

                    <TextField
                        onChange={(e) => setDetails(e.target.value)}
                        sx={{
                            marginTop: '20px',
                            marginBottom: '20px'
                        }}
                        label="Details"
                        variant="outlined"
                        color="secondary"
                        multiline
                        rows={4}
                        fullWidth
                        required
                        error={detailsError}
                    />
                    <FormControl fullWidth sx={{
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}>
                        <FormLabel>Note Category</FormLabel>
                        <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                            <FormControlLabel value="money" control={<Radio />} label="Money" />
                            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
                            <FormControlLabel value="work" control={<Radio />} label="Work" />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        endIcon={<KeyboardArrowRight />}
                        type="submit"
                        color="secondary"
                        variant="contained">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Box>
    )
};