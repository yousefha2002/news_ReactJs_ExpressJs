import { Box, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReactPlayer from 'react-player'
import { video } from '../../../types/Video';

type Props = {
    video: video,
    handleDelete : (id: number) => Promise<void>
}

function AdminVideoBox({video , handleDelete} : Props) {
    return (
    <>
    <Grid container justifyContent={"space-between"} spacing={1}>
        <Grid item xs={11}>
            <ReactPlayer url={video.url} width="100%" height={250}/>
            <Box sx={{padding:"0px 8px 16px"}}>
                <Typography sx={{marginTop:"12px",fontWeight:"700",fontSize:"15px"}}>{video.title}</Typography>
            </Box>
        </Grid>
        <Grid item xs={1}>
            <Tooltip title="حذف">
                <IconButton sx={{minWidth:"10px"}} color="error" onClick={e=>handleDelete(video.id)}>
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
        </Grid>
    </Grid>
    <Divider sx={{marginBottom:"30px"}}/>
    </>
  )
}

export default AdminVideoBox