import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteItem = ({ yaad }) => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const [password, setPassword] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function deleteNote(url = "") {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "DELETE",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                userpassword: password,
            })
        });
        let res = await response.json();
        return res;
    }

    const handleDelete = async () => {
        if (password.length < 5) {
            setMessage("Enter valid password")
            setPassword("")
        }
        else if (password.length >= 5) {
            let del = await deleteNote(`deletememory/${yaad._id}`)
            setMessage(del.message)
        }
    }

    if (message) {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }

    return (
        <>
            <div>
                <Fab size="small" aria-label="delete">
                    <DeleteIcon sx={{ cursor: "pointer" }} onClick={handleClickOpen} />
                </Fab>

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
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                        />
                        <Typography color="secondary">
                            {message}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}  >Cancel</Button>
                        <Button onClick={handleDelete} varient="contained" color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </div >

        </>
    )
}


export default DeleteItem;