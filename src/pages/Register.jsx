import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import Snacks from '../components/Snacks';

export default function Register() {
    let navigate = useNavigate();
    const [snackbar_, setSnackBar_] = useState({
        message: "",
        open: false
    })

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [emailMessage, setEmailMessage] = useState("");

    async function postData(url = "") {
        console.log("URL: " + `${process.env.REACT_APP_BACKEND_URL}/${url}`)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
        });
        let res = await response.json();
        return res;
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const formSubit = async () => {


        if (data.username.length < 6) {
            setSnackBar_({
                message: "Try another username",
                open: true,
            })
            return;
        }
        if (!validateEmail(data.email)) {
            setSnackBar_({
                message: "Invalid Email",
                open: true,
            })
            return;
        }

        const checkPassword = (str) => {
            var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(str);
        }

        if (!checkPassword(data.password)) {
            setSnackBar_({
                message: "Follow Password *requirements*",
                open: true
            })
            return;
        }

        let res = await postData("auth/register");
        if (res.status == 0) {
            setSnackBar_({
                message: res.message,
                open: true,
            })
        } else if (res.status == 1) {
            setSnackBar_({
                message: "Registerd successfully, You will be redirected in 4 seconds",
                open: true,
            })
            setTimeout(() => {
                navigate("/login")
            }, 4000);
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const onChangeEmail = (e) => {
        handleChange(e)
        if (!validateEmail(data.email)) {
            setEmailMessage("*Enter valid email")
        }
        else if (validateEmail(data.email)) {
            setEmailMessage("")
        }
    }


    useEffect(() => {
        document.title = "Register - GEET"
        if (localStorage.getItem("user")) {
            navigate("/")
        }
    }, [])


    return (
        <>
            <Snacks snackbar_={snackbar_} setSnackBar_={setSnackBar_} />

            <Container component="main" maxWidth="xs" style={{ marginBottom: "7rem" }}>

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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    type='text'
                                    value={data.username}
                                    onChange={handleChange}

                                />
                                <Typography variant='body2' component="body2" color="secondary.dark" sx={{ fontSize: "12px" }}>*Username should contain  more then 6 characters</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={onChangeEmail}
                                />
                                <Typography variant='body2' component="body2" color="secondary.dark" sx={{ fontSize: "12px" }}>{emailMessage}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={data.password}
                                    onChange={handleChange}
                                />
                                <Typography variant='body' component="body" color="secondary.dark" sx={{ fontSize: "12px" }}>*Password should contain  min 8 letters , with at least a symbol, upper and lower case letters and a number</Typography>
                            </Grid>

                        </Grid>
                        <Button
                            onClick={formSubit}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}