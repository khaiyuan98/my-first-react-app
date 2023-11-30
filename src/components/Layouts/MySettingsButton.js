import { Box, FormControlLabel, IconButton, Menu, MenuItem, Switch } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/darkMode";

export const MySettingsButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
    const dispatch = useDispatch();

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggleDarkMode = (event) => {
        dispatch(toggleDarkMode());
        localStorage.setItem('dark-mode', event.target.checked);
    };
    
    return (
        <Box>
            <IconButton
                id="settings-button"
                color="inherit"
                aria-label="open settings"
                edge="start"
                onClick={(event) => { handleOpen(event) }}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>
                    <FormControlLabel
                        value="dark-mode"
                        control={<Switch color="primary" checked={isDarkMode} onChange={handleToggleDarkMode} />}
                        label="Dark Mode"
                        labelPlacement="start"
                    />
                </MenuItem>
            </Menu>
        </Box>
    )
};