import { Grid } from "@mui/material";
import UserDataGrid from "../../components/Admin/Users/UserDataGrid";

export const UsersPage = () => {
    return (
        <Grid container spacing={3}>
            <Grid item sm={12}>
                <UserDataGrid />
            </Grid>
        </Grid>
    )
}