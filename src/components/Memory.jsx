import { Badge, Box, Button, Card, CardMedia, Chip, Container, Fab, Grid, IconButton, Snackbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, BrowserRouter as Router, Route, useParams, Navigate, useNavigate } from "react-router-dom";
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
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

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
    const [userToken, setUserToken] = useState()

    let navigate = useNavigate();

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
        if (!res) {
            window.location.href = "/"
            return;
        }
        let mem = res.memory[0]
        setMemory(mem);
        document.title = `${mem.name} | GEET `
    }

    async function postLike(url = "") {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": userToken
            },
        });
        let res = await response.json();
        return res;
    }

    const likeClick = async () => {

        if (!userToken) {
            setSnackMessage("Please login!!")
            setOpen(true);
            return;
        }

        let res = await postLike(`memory/stats/like/${memory._id}`)
        // console.log(res.message)
        if (res.status == 1) {
            setPostLiked(true);
            setSnackMessage("Glad ! you loved this.")
            setOpen(true);
        } else if (res.status == 0) {
            setSnackMessage(res.message)
            setOpen(true);
        }
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

    const copyCurrentUrl = () => {
        navigator.clipboard.writeText(`${window.location.href}`)
        setSnackMessage("copied.")
        setOpen(true);
    }


    useEffect(() => {
        let user_token = localStorage.getItem("user-token");
        setUserToken(user_token)
        getMem();
    }, [postLiked])



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
                                    }} badgeContent={memory.likes} color="secondary">
                                        <Fab size="small" color="primary" disabled={postLiked} onClick={likeClick} aria-label="add" >

                                            {
                                                !postLiked ? <FavoriteBorderIcon /> : <FavoriteIcon color="secondary" />
                                            }

                                        </Fab>
                                    </Badge>
                                </Tooltip>


                                <Tooltip title="views" placement="bottom">
                                    <Badge badgeContent={memory.views} color="secondary" >
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
                                {
                                    userToken ?
                                        <Tooltip title="Delete" color="primary" sx={{ cursor: "pointer" }} placement="bottom">
                                            <DeleteItem yaad={memory} />
                                        </Tooltip>
                                        :
                                        <Tooltip title="Login" color="primary" sx={{ cursor: "pointer" }} placement="bottom">
                                            <Fab size="small" color="primary" onClick={()=>{navigate("/login")}} aria-label="copy">
                                                <NoAccountsIcon />
                                            </Fab>
                                        </Tooltip>

                                }

                            </Container>
                        </Grid>

                        <Grid item xs={6} sx={{ backgroundColor: "", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50%" }}  >
                            <Typography color="white" backgroundColor="red" sx={{ maxLines: 12, py: 2, px: 2, borderRadius: 1, m: 1, textAlign: "center", wordBreak: "break-all" }}>
                                {memory.desc}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }} align="center" >
                            <Box
                                component="img"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    padding: "0",
                                    margin: "10px 0px"
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