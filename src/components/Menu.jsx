import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let navigate = useNavigate();

    function userLogout(){
        localStorage.removeItem("user-token");
        window.location.href = "/login"
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AccountCircleIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Grid container space={2} direction="column">
                    <Grid item >
                        <MenuItem onClick={()=>{
                            navigate("/me")
                        }}><SentimentSatisfiedAltIcon color='secondary' sx={{ mr: 1 }} /> Profile</MenuItem>
                    </Grid>
                    <Grid>

                        <MenuItem onClick={()=>{
                            userLogout()
                        }}><ExitToAppIcon sx={{ mr: 1 }} color='secondary' />Logout</MenuItem>
                    </Grid>
                </Grid>
            </Menu>
        </div>
    );
}
