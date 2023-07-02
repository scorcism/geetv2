
import { Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import DeleteItem from "./DeleteItem";


const GridItem = ({ yaad }) => {
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 160 }}
                    image={yaad.image}
                    title={yaad.name}
                />
                <CardContent>
                    <Typography align="center" gutterBottom  component="p">
                        {yaad.name.length <= 30 ? yaad.name : (yaad.name.substr(0, 30) + "...")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {yaad.desc.length <= 60 ? yaad.desc : (yaad.desc.substr(0, 60) + "...")}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Tooltip title="Likes" placement="bottom-start">
                        <Typography align="center" sx={{ display: "flex" }}>
                            <FavoriteIcon />{yaad.likes}
                        </Typography>
                    </Tooltip>
                    <Tooltip title="Dislikes" placement="bottom">
                        <Typography align="center" sx={{ display: "flex" }}>
                            <HeartBrokenIcon />{yaad.dislikes}
                        </Typography>
                    </Tooltip>
                    <Tooltip title="Views" placement="bottom-end">
                        <Typography align="center" sx={{ display: "flex" }}>
                            <VisibilityIcon />{yaad.views}
                        </Typography>
                    </Tooltip>
                    <Tooltip title="Delete" placement="bottom">
                        <p style={{cursor:"pointer"}}>
                        <DeleteItem yaad={yaad} />
                        </p>
                    </Tooltip>
                </CardActions>
            </Card>


        </>
    )
}

export default GridItem;