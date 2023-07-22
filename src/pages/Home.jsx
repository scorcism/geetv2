import { Box, Grid, Tooltip, Typography } from "@mui/material";
import GridItem from "../components/GridItem";
import { useGlobalContext } from "../context/memories";
import InfiniteScroll from 'react-infinite-scroll-component';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { useEffect } from "react";

const Home = () => {

    const { memories,  page, setPage, pageCount} = useGlobalContext();

    const fetchData = () => {
        // let p = page;
        setPage((p) => {
            // if(p===pageCount){
            if (p === Math.ceil(pageCount)) {
                return p;
            }
            return p + 1;
        })
    }

    useEffect(()=>{
        document.title = "GEET"
    },[])

    return (
        <>
            <Box sx={{ mx: 2, my: 3, }}>

                <InfiniteScroll
                    dataLength={memories.length} 
                    next={fetchData}
                    hasMore={page !== pageCount}
                    loader={<Typography align="center" variant="h4">
                        <HourglassTopIcon/>
                    </Typography>}
                    endMessage={
                        <Typography align="center" variant="h4">
                            <Tooltip title="Done" placement="right">
                                <BatteryCharging20Icon />
                            </Tooltip>
                        </Typography>
                    }
                >
                    <Grid container spacing={3}>
                        {
                            memories.map((yaad) => {
                                return (
                                    <Grid item md={3} sm={12}>
                                        <GridItem yaad={yaad} />
                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                </InfiniteScroll >
            </Box>
        </>
    )
}

export default Home;