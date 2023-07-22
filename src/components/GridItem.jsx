
import { Button, Card, CardActions, CardContent, CardMedia, Container, Link, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DeleteItem from "./DeleteItem";
import { Link as RouterLink } from 'react-router-dom'

const GridItem = ({ yaad }) => {


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

    const updateViews = async () => {
        let res = await postLike(`memory/stats/view/${yaad._id}`)
    }

    return (
        <>
            <Card md={{ maxWidth: 345 }} sm={{ maxWidth: 345 }}>
                <Link component={RouterLink} onClick={updateViews} to={`/memory/${yaad._id}`}>
                    <CardMedia
                        sx={{ height: 160 }}
                        image={yaad.image}
                        title={yaad.name}
                    />
                </Link>
                <p style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Tooltip title="Mood" placement="right">
                        <Typography sx={{ pl: 2, textTransform: "capitalize" }}>{yaad.mood}</Typography>
                    </Tooltip>
                    <Tooltip title="Author" placement="left">
                        <Typography color="secondary" sx={{ pr: 2, }}>{yaad.handle}</Typography>
                    </Tooltip>
                </p>
                <CardContent>
                    <Typography align="center" gutterBottom component="p" sx={{ textTransform: "capitalize" }}>
                        {yaad.name.length <= 30 ? yaad.name : (yaad.name.substr(0, 30) + "...")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {yaad.desc.length <= 60 ? yaad.desc : (yaad.desc.substr(0, 60) + "...")}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                    <Tooltip title="Likes" placement="bottom-start">
                        <Typography align="center" sx={{ display: "flex" }}>
                            <FavoriteIcon />{yaad.likes}
                        </Typography>
                    </Tooltip>
                    <Tooltip title="Views" placement="bottom-end">
                        <Typography align="center" sx={{ display: "flex" }}>
                            <VisibilityIcon />{yaad.views}
                        </Typography>
                    </Tooltip>
                </CardActions>
            </Card>


        </>
    )
}

export default GridItem;