import { Box, Link, Typography } from "@mui/material"




const Footer = () => {
    return (
        <>
            <Box component="footer" >

                <Typography variant="p" component="div" sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <Link href="/" underline="none" >
                        GEET
                    </Link>
                    <Typography color="secondary.dark" sx={{ ml: 1, mr: 1, fontWeight: 600 }} >
                        -
                    </Typography>
                    <Link href="/" underline="none" sx={{
                        '&:hover': {
                            color: "secondary",
                        }
                    }}>
                        Abhishek Pathak
                    </Link>


                </Typography>
            </Box>

        </>
    )
}

export default Footer