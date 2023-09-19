import React from 'react'
import Layout from '../../components/user/Layout'
import { Container,Typography,Box,Grid } from '@mui/material'
import ReactPlayer from 'react-player'
import HeaderTitle from '../../components/reusableUi/HeaderTitle'
import Video from '../../components/reusableUi/Video'
import { useParams } from 'react-router-dom'
import { useRandomVideos, useSingleVideo } from '../../hooks/useVideos'

export default function SingleVideo() {
    const {videoId} = useParams();
    const {data : video} = useSingleVideo(videoId||"")
    const {data:randomVideos} = useRandomVideos();
    return (
        <Layout>
            <Container sx={{marginY:"40px"}}>
                <Box sx={{width:"70%",margin:"auto"}}>
                    <ReactPlayer url={video?.video.url} width="100%" height={400}/>
                </Box>
                <Typography sx={{marginTop:"24px",marginBottom:"80px",textAlign:"center",fontWeight:"800",fontSize:"22px"}}
                    > {video?.video.title}
                </Typography>
                <HeaderTitle title="فيديوهات آخرى"/>
                <Grid container spacing={2}>
                    {
                        randomVideos?.videos.map(ra=>{
                            return <Grid key={ra.id+"kj"} item xs={12} sm={6} md={4} lg={3}><Video video={ra}/></Grid>
                        })
                    }
                </Grid>
            </Container>
        </Layout>
    )
}
