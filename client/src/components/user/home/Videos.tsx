import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import HeaderTitle from '../../reusableUi/HeaderTitle'
import Video from '../../reusableUi/Video'
import { Link } from 'react-router-dom'
import { useVideos } from '../../../hooks/useVideos'

export default function Videos() {
    const {data,isLoading} = useVideos()
    console.log(data)

    return (
        <Box sx={{backgroundColor:"#f7f7f9",paddingBottom:"20px",paddingTop:"30px",marginY:"40px"}}>
            <Container>
                <Link to="/videos"><HeaderTitle title="فيديو"/></Link>
                <Grid container spacing={2}>
                    {
                        isLoading?
                        ""
                        :
                        data?.videos?.map((video,index)=>
                        {
                            return <Grid item xs={12} sm={6} md={4} lg={3} key={index+'apa'}><Video video={video}/></Grid>
                        })
                    }
                </Grid>
            </Container>
        </Box>
    )
}
