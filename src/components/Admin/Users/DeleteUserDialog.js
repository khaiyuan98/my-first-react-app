import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState } from "react";


const DELETE_URL = '/user';

export const DeleteUserDialog = ({ itemToDelete, open, setDeleteDialogOpen, refreshData }) => {

    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

    const axios = useAxiosPrivate();

    const showSuccessMessage = () => {
        setAlertSettings({
            message: 'Successfully deleted user',
            severity: 'success'
        });

        setAlertIsOpen(true);
    };

    const showErrorMessage = () => {
        setAlertSettings({
            message: 'Failed to delete user',
            severity: 'error'
        });

        setAlertIsOpen(true);
    };


    const handleClickConfirmDelete = () => {
        // Delete user here
        axios.delete(`${DELETE_URL}/${itemToDelete.UserId}`)
            .then((response) => {
                showSuccessMessage();
                setDeleteDialogOpen(false);
                refreshData();
            })
            .catch((err) => {
                showErrorMessage();
            });
    }

    const handleCloseDialog = () => {
        setDeleteDialogOpen(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    You are about to delete {itemToDelete?.Username}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to permanently delete {itemToDelete?.Username}?
                    </DialogContentText>
                    <DialogContentText variant="body2" id="alert-dialog-description">
                        This user will be deleted immediately. You cannot undo this action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="primary" onClick={handleCloseDialog}>No</Button>
                    <Button variant="contained" color="error" onClick={handleClickConfirmDelete}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alertIsOpen}
                autoHideDuration={5000}
                onClose={() => setAlertIsOpen(false)}
            >
                <Alert onClose={() => setAlertIsOpen(false)} severity={alertSettings.severity} sx={{ width: '100%' }}>
                    {alertSettings.message}
                </Alert>
            </Snackbar>
        </>

    )
} 