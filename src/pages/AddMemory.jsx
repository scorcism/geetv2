import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Snacks from '../components/Snacks';


export default function AddMemory() {

    const URL = `http://localhost:5000/api`;

    const [image, setImage] = useState();
    const [data, setData] = useState({
        name: "",
        mood: "happy",
        handle: "anonymous",
        desc: "",
        password: ""
    })

    const [snackbar_, setSnackBar_] = useState({
        message: "",
        open: false
    })

    const [titleLen, setTitleLen] = useState("");
    const [descLen, setDescLen] = useState("");

    const postData = async () => {
        const requestOptions = {
            method: "POST",
            crossDomain: true,

            headers: {
                "Content-Type": "application/json",
                Access: "application/json",
                "Access-Control-Allow-Origin": "*"
            },

            body: JSON.stringify({
                mood: data.mood,
                desc: data.desc,
                handle: data.handle,
                name: data.name,
                image: image,
                password: data.password
            })
        }
        fetch(`${URL}/addmemory`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 1) {
                    setSnackBar_({
                        message: "Memory Added",
                        open: true
                    })
                } else if (data.status == 0) {
                    setSnackBar_({
                        message: "Some error occured!",
                        open: true
                    })
                }
            })
    };

    const handleSubmit = (event) => {
        if (data.name.length < 20 || data.name.length >= 85) {
            alert("Title should be between 20 and 85 character")
            return;
        }
        if (data.desc.length < 300 || data.desc.length > 900) {
            alert("Desc length should be between 300 and 900 character")
            return;
        }
        if(!image){
            alert("Set Image");
            return;
        }
        postData();
    };

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const convertToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
            setSnackBar_({
                message: "Image Added",
                open: true
            })
        }
        reader.onerror = (error) => {
            setSnackBar_({
                message: error.message,
                open: true
            })
        };
    }

    const onChangeTitle = (e) => {
        handleOnChange(e);
        if (e.target.value.length >= 85) {
            setTitleLen("Remove: " + (85 - e.target.value.length))
        } else if (e.target.value.length < 20) {
            setTitleLen("Should be: " + (20 - e.target.value.length) + " more")
        } else {
            setTitleLen("")
        }
    }

    const onChangeDesc = (e) => {
        handleOnChange(e);
        if (e.target.value.length >= 900) {
            setDescLen("Remove: " + (900 - e.target.value.length))
        } else if (e.target.value.length < 300) {
            setDescLen("Should be: " + (300 - e.target.value.length) + " more")
        } else {
            setDescLen("")
        }
    }

    useEffect(() => {
        document.title = "Add Memory - GEET"
    }, [])

    return (
        <>
            <Snacks snackbar_={snackbar_} setSnackBar_={setSnackBar_} />
            <Container component="main" maxWidth="xs" sx={{ mb: 6 }}>

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <SentimentVerySatisfiedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Memory
                    </Typography>
                    <Box component="div" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Mood</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={data.mood}
                                        label="Mood"
                                        name="mood"
                                        onChange={handleOnChange}
                                    >
                                        <MenuItem value={"happy"}>Happy</MenuItem>
                                        <MenuItem value={"sad"}>Sad</MenuItem>
                                        <MenuItem value={"anger"}>Anger</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Handle"
                                    name="handle"
                                    placeholder={data.handle}
                                    title="leave black for anonimity"
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="name"
                                    label="Title"
                                    type="text"
                                    id="title"
                                    value={data.name}
                                    onChange={onChangeTitle}
                                />
                                <Typography variant='body2' component="body2">{titleLen} </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <textarea rows="10" cols="45" style={{ border: "1px solid white", backgroundColor: "#121212", color: "white", outline: "none", padding: "4px 5px" }} placeholder='Add Description about the memory' value={data.desc} onChange={onChangeDesc} name="desc" />
                                <Typography variant='body2' component="body2">{descLen}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleOnChange}
                                />
                            </Grid>

                        </Grid>
                        <Grid container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing="4"
                        >
                            <Grid item xs={4} >
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Upload File
                                    <input
                                        type="file"
                                        accept='.png,.jpg,.jpeg'
                                        hidden
                                        onChange={convertToBase64}
                                    />
                                </Button>
                            </Grid>
                            <Grid items xs={8}>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Memory
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>

    );
}