import * as React from 'react';
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


export default function AddMemory() {

    const [data, setData] = React.useState({
        name: "",
        mood: "happy",
        handle: "anonymous",
        desc: "",
        password: ""
    })


    const handleSubmit = (event) => {
        console.log(data)
    };

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
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
                                    onChange={handleOnChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <textarea rows="10" cols="45" style={{ border: "1px solid white", backgroundColor: "#121212", color: "white", outline: "none", padding: "4px 5px" }} placeholder='Add Description about the memory' value={data.desc} onChange={handleOnChange} name="desc" />
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