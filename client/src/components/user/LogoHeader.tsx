import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function LogoHeader() {
    return (
        <Box sx={{backgroundColor:"#b80000"}}>
            <Container sx={{paddingY:"12px"}}>
                <Link to="/">
                    <Typography sx={{fontSize:"28px",color:"white",fontWeight:"700"}}>مجلتي</Typography>
                </Link>
            </Container>
        </Box>
    )
}
