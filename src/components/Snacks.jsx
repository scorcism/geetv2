import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Snacks({ snackbar_, setSnackBar_ }) {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBar_({
            message:"",
            open:false
        });
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={snackbar_.open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackbar_.message}
                action={action}
            />
        </div>
    );
}