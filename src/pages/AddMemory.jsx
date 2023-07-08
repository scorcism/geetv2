import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { TextareaAutosize } from '@mui/base';


const AddMemory = () => {

    useEffect(() => {

        document.title = "Add Memory | GEET"
    }, [])

    const [age, setAge] = useState('');

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };


    return (
        <>
            <div>
                <FormControl>
                    <Typography variant="h5" >Add Memory</Typography>
                    <Stack>
                        <TextField sx={{ mt: 2 }} label="Title" type="text" />
                        <TextField sx={{ mt: 2 }} label="Description" type="text" />
                        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                            <TextField sx={{}} label="Handle" type="text" />
                            <TextareaAutosize />
                        </Stack>
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Box>
                                <InputLabel id="demo-simple-select-label" color="secondary">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChangeAge}
                                    size="small"
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Box>
                        </Stack>
                    </Stack>
                </FormControl>
            </div>
        </>
    )
}

export default AddMemory
