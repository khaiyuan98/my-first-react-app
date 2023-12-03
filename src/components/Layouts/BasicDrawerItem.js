import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"


export const BasicDrawerItem = ({ item, handleMenuItemClick, activeMenuItem, sx }) => {

    return (
        <>
            <ListItemButton
                sx={sx}
                onClick={() => handleMenuItemClick(item)}
                selected={item.path === activeMenuItem}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
            </ListItemButton>
        </>
    )
}