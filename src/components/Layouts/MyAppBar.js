import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { MySettingsButton } from "./MySettingsButton";

export const MyAppBar = ({ drawerWidth = 240, drawerIsOpen, setDrawerOpen}) => {

    const handleMenuClick = () => {
        setDrawerOpen(!drawerIsOpen);
        console.log('Menu Clicked');
    }

    return (
        <AppBar
            // sx={{ width: `calc(100% - ${drawerWidth}px)` }}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            elevation={1}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography>
                    Sample App
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                <MySettingsButton/>
            </Toolbar>
        </AppBar>
    )
};