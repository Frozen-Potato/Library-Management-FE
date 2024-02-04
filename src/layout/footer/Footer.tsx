import { Box, Container, Typography } from "@mui/material"

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: "relative",
                backgroundSize: "cover",
                pt : 5,
                mt: 5
            }}
        >
            <Container 
                maxWidth="lg"
                sx={{
                    mb: -6
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                        paddingBottom: 2
                    }}
                >
                    <Typography>
                        Made by Frozen-Potato @ 5am while high on caffein
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
}