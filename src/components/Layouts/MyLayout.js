import styled from "@emotion/styled";
import { MyAppBar } from "./MyAppBar";
import { MyDrawer } from "./MyDrawer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    })
  }),
);


export const MyLayout = () => {
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
    const [drawerIsOpen, setDrawerOpen] = useState(true);

    return (
        <div style={{ display: 'flex' }}>
            {/* App Bar */}
            <MyAppBar drawerWidth={drawerWidth} drawerIsOpen={drawerIsOpen} setDrawerOpen={setDrawerOpen}/>
            <MyDrawer drawerWidth={drawerWidth} drawerIsOpen={drawerIsOpen}/>

            <Main open={drawerIsOpen}>
                <Offset />
                <Outlet />  
            </Main>
        </div>
    )
}