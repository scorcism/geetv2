import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteItem = ({ yaad }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>
                <DeleteIcon onClick={handleClickOpen} />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{yaad.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="secondary">
                            are you sure you want to delete the memory.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Enter Password"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}  >Cancel</Button>
                        <Button onClick={handleClose} varient="contained" color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </div >

        </>
    )
}


export default DeleteItem;