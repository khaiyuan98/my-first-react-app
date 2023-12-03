import { AddCircleOutline, SubjectOutlined } from "@mui/icons-material";
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NestedDrawerItem } from "./NestedDrawerItem";
import { BasicDrawerItem } from "./BasicDrawerItem";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';

export const MyDrawer = ({ drawerWidth = 240, drawerIsOpen = true }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

    const menuItems = [
        {
            type: 'Basic',
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            type: 'Basic',
            text: 'Create Note',
            icon: <AddCircleOutline color="secondary" />,
            path: '/create'
        },
        {
            type: 'Nested',
            text: 'Administrator',
            icon: <AdminPanelSettingsIcon color="secondary" />,
            children: [
                {
                    text: 'Users',
                    icon: <PeopleIcon color="secondary" />,
                    path: '/users',
                }
            ]
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
                        {item.type == 'Nested'
                            ? <NestedDrawerItem
                                item={item}
                                handleMenuItemClick={handleMenuItemClick}
                                activeMenuItem={activeMenuItem}
                            />
                            : <BasicDrawerItem
                                item={item}
                                handleMenuItemClick={handleMenuItemClick}
                                activeMenuItem={activeMenuItem}
                            />
                        }
                        <Divider />
                    </div>
                )}

            </List>
        </Drawer>
    )
};