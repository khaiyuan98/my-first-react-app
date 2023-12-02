import { Box, FormControlLabel, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Switch } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/darkMode";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';


export const MySettingsButton = () => {

    const LOGIN_URL = '/login';
    const logout = useLogout();
    const navigate = useNavigate();

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

    const handleLogout = async () => {
        await logout();
        navigate(LOGIN_URL);
    }

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
                    <ListItemIcon>
                        <DarkModeIcon />
                    </ListItemIcon>
                    <FormControlLabel
                        sx={{marginLeft:"0px"}}
                        value="dark-mode"
                        control={<Switch color="primary" checked={isDarkMode} onChange={handleToggleDarkMode} />}
                        label="Dark Mode"
                        labelPlacement="start"
                    />
                    
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    )
};