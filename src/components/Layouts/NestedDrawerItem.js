import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react";
import { BasicDrawerItem } from "./BasicDrawerItem";


export const NestedDrawerItem = ({ item, handleMenuItemClick, activeMenuItem }) => {
    const [open, setOpen] = useState(item.children?.map(child => child.path).includes(activeMenuItem));

    const handleClickOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClickOpen}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {item.children?.map(child =>
                        <div key={child.text}>
                            <BasicDrawerItem
                                sx = {{pl: 4}}
                                item={child}
                                handleMenuItemClick={handleMenuItemClick}
                                activeMenuItem={activeMenuItem}
                            />
                        </div>
                    )}
                </List>
            </Collapse>
        </>
    )
}