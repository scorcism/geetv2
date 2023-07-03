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
import CloseIcon from '@mui/icons-material/Close';

const Memory = () => {

    let { id } = useParams();
    const [memory, setMemory] = useState();
    const [likes, setLikes] = useState();
    const [dislikes, setDislikes] = useState();
    const [views, setViews] = useState();
    const [open, setOpen] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    const [postDisliked, setPostDisliked] = useState(false);
    const [snackMessage, setSnackMessage] = useState("")

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
        // console.log(res)
        let mem = res[0]
        setMemory(mem);
        setLikes(mem.likes);
        setDislikes(mem.dislikes)
        setViews(mem.views)
    }

    async function postLike(url = "") {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        let res = await response.json();
        return res;
    }

    const dislikeClick = async () => {
        let res = await postLike(`memory/stats/dislike/${memory._id}`)
        // console.log(res)
        setDislikes(res.message)
        setPostDisliked(true);
        setSnackMessage("sorry to see that")
        setOpen(true);
    }

    const likeClick = async () => {
        let res = await postLike(`memory/stats/like/${memory._id}`)
        // console.log(res)
        setLikes(res.message)
        setPostLiked(true);
        setSnackMessage("Glad ! you loved this.")
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    if (open) {
        setTimeout(() => {
            setOpen(false);
        }, 3000);
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    const copyCurrentUrl =() =>{
        navigator.clipboard.writeText(`${window.location.href}`)
        setSnackMessage("copied.")
        setOpen(true);
    }


    useEffect(() => {
        getMem();
    }, [])



    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackMessage}
                action={action}
            />
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
                                    }} badgeContent={likes} color="secondary">
                                        <Fab size="small" color="primary" disabled={(postDisliked || postLiked)} onClick={likeClick} aria-label="add" >

                                            {
                                                (!postLiked && !postDisliked) ? <FavoriteBorderIcon /> : <FavoriteIcon color="secondary" />
                                            }

                                        </Fab>
                                    </Badge>
                                </Tooltip>

                                <Tooltip title="Dislike" placement="bottom">
                                    <Badge anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }} badgeContent={dislikes} color="secondary">
                                        <Fab size="small" color="primary" disabled={(postDisliked || postLiked)} onClick={dislikeClick} aria-label="add">
                                            {
                                                (!postDisliked && !postLiked) ?<ThumbDownOffAltIcon /> : <SentimentDissatisfiedIcon/>
                                            }

                                        </Fab>
                                    </Badge>
                                </Tooltip>

                                <Tooltip title="views" placement="bottom">
                                    <Badge badgeContent={views} color="secondary" >
                                        <Fab size="small" color="primary" aria-label="views">
                                            <RemoveRedEyeIcon />
                                        </Fab>
                                    </Badge>
                                </Tooltip>

                                <Tooltip title="copy" sx={{ cursor: "pointer" }} placement="bottom">
                                    <Fab size="small" color="primary" onClick={copyCurrentUrl} aria-label="copy">
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
                                <Chip icon={<FaceIcon />} label={memory.handle} />
                            </Tooltip>
                        </Grid>

                    </Grid>
                }
            </Box>
        </>
    )

}

export default Memory