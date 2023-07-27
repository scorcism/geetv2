import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Snacks from '../components/Snacks';


export default function Login() {

    let navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
    })

    const [snackbar_, setSnackBar_] = useState({
        message: "",
        open: false
    })

    async function postData(url = "") {
        console.log("URL: " + `${process.env.REACT_APP_BACKEND_URL}/${url}`)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
        });
        let res = await response.json();
        return res;
    }

    const formSubmit = async () => {

        let res = await postData("auth/login");
        if (res.status == 0) {
            setSnackBar_({
                message: res.message,
                open: true,
            })
        } else if (res.status == 1) {
            setSnackBar_({
                message: "Logged in successfully, you will be redirected to home page in 2 seconds",
                open: true,
            })
            localStorage.setItem("user-token", res.message)
            setTimeout(() => {
                window.location.href="/"
            }, 2000);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleOnKeyUp = (e) => {
        if(e.key =="Enter"){
            formSubmit();
        }
    }


    useEffect(() => {
        document.title = "Login - GEET"
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    }, [])

    return (
        <div>
            <Snacks snackbar_={snackbar_} setSnackBar_={setSnackBar_} />
            {/* <div style={{ backgroundImage: "url(/bg.png)", minHeight: "100vh", paddingTop: "10rem" }}> */}
            <Container component="main" style={{}} maxWidth="xs" sx={{ marginBottom: "8rem" }}>
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            autoFocus
                            value={data.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={handleChange}
                            onKeyUp={handleOnKeyUp}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={formSubmit}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}