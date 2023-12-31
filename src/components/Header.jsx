import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import UserMenu from './Menu';

const Header = () => {

    const [userToken, setUserToken] = useState();

    useEffect(() => {
        setUserToken(localStorage.getItem("user-token"));
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <FavoriteIcon size="large" edge="start" sx={{ mr: 0.3 }} color="secondary" />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link component={RouterLink} underline="none" to="/" >
                                GEET
                            </Link>
                        </Typography>
                        {
                            userToken ? <Box component="div" sx={{display:"flex"}}>

                                <Button color="inherit">
                                    <Link component={RouterLink} variant='text' underline="none" to="/add">Add Memory</Link>
                                </Button>
                                <UserMenu/>
                            </Box>
                                :
                                <>
                                    <Button color="inherit">
                                        <Link component={RouterLink} variant='text' underline="none" to="/login">Login</Link>
                                    </Button>
                                    <Typography style={{ marginLeft: "0.3rem", marginRight: "0.3rem" }} />
                                    <Button color="inherit" >
                                        <Link component={RouterLink} variant='text' underline="none" to="/register">Register</Link>
                                    </Button>
                                </>
                        }
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

export default Header