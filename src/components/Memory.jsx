import { Box, Card, CardMedia, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";


const Memory = () => {

    let { id } = useParams();
    const [memory, setMemory] = useState();

    async function getMemory(url = "") {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    }


    const getMem = async () => {
        let res = await getMemory(`/getmemory/${id}`)
        setMemory(res[0]);
    }

    useEffect(() => {
        getMem();
    }, [])

    if (memory) {
        console.log(memory)
    }

    return (
        <>
            <Box>
                {
                    memory &&
                    <Grid container space={2}>

                        <Grid item xs={6}>
                            {memory.name}
                        </Grid>
                        <Grid item xs={6}>
                            {memory.desc}
                        </Grid>
                        <Grid item xs={6}>
                            <Box
                                component="img"
                                sx={{
                                    height: 233,
                                    width: 350,
                                    maxHeight: { xs: 233, md: 167 },
                                    maxWidth: { xs: 350, md: 250 },
                                }}
                                alt={memory.name}
                                src={memory.image}
                            />
                        </Grid>
                    </Grid>
                }
            </Box>
        </>
    )

}

export default Memory