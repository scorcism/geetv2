import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';

const Header = () => {
    
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <FavoriteIcon size="large" edge="start" sx={{ mr: 0.3 }} color="secondary" />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link underline="none" href="/" >
                                GEET
                            </Link>
                        </Typography>
                        <Button color="inherit">Add Memory</Button>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

export default Header