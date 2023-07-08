import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';
import { Link as RouterLink} from 'react-router-dom'

const Header = () => {
    
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
                        <Button color="inherit">
                            <Link component={RouterLink} variant='text' underline="none" to="/add">Add Memory</Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}

export default Header