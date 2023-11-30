import { AddCircleOutline, SubjectOutlined } from "@mui/icons-material";
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const MyDrawer = ({ drawerWidth = 240, drawerIsOpen = true }) => {
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const navigate = useNavigate();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutline color="secondary" />,
            path: '/create'
        }
    ]

    const handleMenuItemClick = (item) => {
        console.log(`Menu item: ${item.text}`);
        setActiveMenuItem(item.path);
        navigate(item.path)
    }

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
            variant="persistent"
            anchor="left"
            open={drawerIsOpen}
        >
            {/* Add this for spacing */}
            <Toolbar />
            <Box>
                <Typography variant="h5">
                     Drawer
                </Typography>
                <Divider />
            </Box>

            {/* List Items */}
            <List>
                {menuItems.map(item =>
                    <div key={item.text}>
                        <ListItemButton
                            onClick={() => handleMenuItemClick(item)}
                            selected={item.path === activeMenuItem}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                        <Divider />
                    </div>
                )}
            </List>
        </Drawer>
    )
};