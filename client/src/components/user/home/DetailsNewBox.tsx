import { Box, Grid, Typography,styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { New } from '../../../types/News';

const Image = styled('img')({
    width:"100%",
    height:"200px",
    objectFit:"cover"
})

const ViewBox = styled(Box)({
    backgroundColor:"#e5e5e5",
    fontSize:"15px",
    padding:"4px 8px",
    borderRadius:"4px",
    maxWidth:"164px",
    display:"flex",
    alignItems:"center",
    marginTop:"8px",
    columnGap:"6px"
})

type props = {
    views?:boolean,
    dataNew?:New
}

export default function DetailsNewBox({views,dataNew}:props) {
    return (
        <Link to={`/news/${dataNew?.id}`}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Image src={`${process.env.REACT_APP_API_KEY}/images/${dataNew?.image}`}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{fontSize:"18px",color:"black",fontWeight:"700",marginBottom:"22px"}}>{dataNew?.title?.slice(0,60)}</Typography>
                    {views&&
                    <ViewBox sx={{color:"black"}}>
                        <VisibilityIcon sx={{fontSize:"18px",fontWeight:"500"}}/>
                        <Typography sx={{fontSize:"14px" , fontWeight:"500"}}>{dataNew?.views}</Typography>
                    </ViewBox>}
                </Grid>
            </Grid>
        </Link>
    )
}
