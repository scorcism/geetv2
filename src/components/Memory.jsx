import { Badge, Box, Button, Card, CardMedia, Chip, Container, Fab, Grid, IconButton, Snackbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import DeleteItem from "./DeleteItem";
import FaceIcon from '@mui/icons-material/Face';
import CloseIcon from '@mui/icons-material/Close'

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
        console.log(res)
        setMemory(res[0]);
    }

    useEffect(() => {
        getMem();
    }, [])



    return (
        <>
            <Box sx={{ px: 3, py: 3, minHeight: '40vw' }}>
                {
                    memory &&
                    <Grid container space={2} sx={{ backgroundColor: "#2b2020", py: 3 }}>

                        <Grid item xs={6} sx={{ backgroundColor: "", display: "flex", alignItems: "center", justifyContent: "center", my: 3 }}  >
                            <Typography color="white" backgroundColor="red" sx={{ py: 2, px: 2, borderRadius: 1 }}>
                                {memory.name}
                            </Typography>
                        </Grid>

                        <Grid items xs={6} sx={{ backgroundColor: "", my: 3, display: "flex", alignItems: "center" }}>
                            
                            <Container sx={{ display: "flex", justifyContent: "space-around" }} >
                                <Tooltip title="Like" placement="bottom" >
                                    <Badge anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }} badgeContent={23} color="secondary">
                                        <Fab size="small" color="primary" aria-label="add" >

                                            <FavoriteBorderIcon />


                                        </Fab>
                                    </Badge>
                                </Tooltip>
                                <Tooltip title="Dislike" placement="bottom">
                                    <Badge anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }} badgeContent={2} color="secondary">
                                        <Fab size="small" color="primary" aria-label="add">
                                            <ThumbDownOffAltIcon />
                                        </Fab>
                                    </Badge>
                                </Tooltip>
                                <Tooltip title="views" placement="bottom">
                                    <Badge badgeContent={56}  color="secondary" >
                                        <Fab size="small" color="primary" aria-label="views">
                                            <RemoveRedEyeIcon />
                                        </Fab>
                                    </Badge>
                                </Tooltip>
                                <Tooltip title="copy" sx={{ cursor: "pointer" }} placement="bottom">
                                    <Fab size="small" color="primary" aria-label="copy">
                                        <ContentCopyIcon />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title="Delete" color="primary" sx={{ cursor: "pointer" }} placement="bottom">

                                    <DeleteItem yaad={memory} />

                                </Tooltip>
                            </Container>
                        </Grid>

                        <Grid item xs={6} sx={{ backgroundColor: "", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50%" }}  >
                            <Typography color="white" backgroundColor="red" sx={{ py: 2, px: 2, borderRadius: 1, m: 1, textAlign: "center" }}>
                                {memory.desc}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} align="center" >
                            <Box
                                component="img"
                                sx={{
                                    m: 1,
                                    maxHeight: "50vh",
                                    maxWeight: "50vh"
                                }}
                                alt={memory.name}
                                src={memory.image}
                            />
                            <Tooltip title="owner">
                                <Chip icon={<FaceIcon />} label="scor32k" />
                            </Tooltip>
                        </Grid>

                    </Grid>
                }
            </Box>
        </>
    )

}

export default Memory