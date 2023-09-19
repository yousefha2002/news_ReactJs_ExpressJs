import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import { Video } from '../../types/Video'

type props = {
    video?:Video
}

export default function VideoBox({video}:props) {
    return (
        <Paper>
            <ReactPlayer url={video?.url} width="100%" height={150}/>
            <Box sx={{padding:"0px 8px 16px"}}>
                <Link to={`/videos/${video?.id}`}>
                    <Typography sx={{marginTop:"12px",fontWeight:"700",fontSize:"15px"}}>{video?.title?.slice(0,80)}</Typography>
                </Link>
            </Box>
        </Paper>
    )
}
