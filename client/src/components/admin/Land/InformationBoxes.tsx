import { Box, Grid, Paper , Typography} from '@mui/material'
import NewspaperIcon from '@mui/icons-material/Newspaper';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArticleIcon from '@mui/icons-material/Article';
import React from 'react'
import { useBoxInfo } from '../../../hooks/admin';

function InformationBoxes() {
    const {data} = useBoxInfo();
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{padding:"30px 20px" , backgroundColor:"#5e72e4" , color:"white" ,display:"flex" , alignItems:"center", gap:"20px"}}>
                <Box sx={{width:"60px" , height:"60px" , borderRadius:"50%" , backgroundColor:"#f5f7fb",display:"flex" ,
                alignItems:"center" , justifyContent:"center"}}>
                    <NewspaperIcon sx={{color:"#37474f", fontSize:"26px"}}/>
                </Box>
                <Box>
                    <Typography variant='h6'>الأخبار</Typography>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>{data?.news}</Typography>
                </Box>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{padding:"30px 20px" , backgroundColor:"#ffaa16" , color:"white",display:"flex" , alignItems:"center", gap:"20px"}}>
                <Box sx={{width:"60px" , height:"60px" , borderRadius:"50%" , backgroundColor:"#f5f7fb",display:"flex" ,
                alignItems:"center" , justifyContent:"center"}}>
                    <OndemandVideoIcon sx={{color:"#37474f", fontSize:"26px"}}/>
                </Box>
                <Box>
                    <Typography variant='h6'>الفيديوهات</Typography>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>{data?.videos}</Typography>
                </Box>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{padding:"30px 20px" , backgroundColor:"#f4511e" , color:"white",display:"flex" , alignItems:"center", gap:"20px"}}>
                <Box sx={{width:"60px" , height:"60px" , borderRadius:"50%" , backgroundColor:"#f5f7fb",display:"flex" ,
                alignItems:"center" , justifyContent:"center"}}>
                    <PeopleAltIcon sx={{color:"#37474f", fontSize:"26px"}}/>
                </Box>
                <Box>
                    <Typography variant='h6'>المؤلفين</Typography>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>{data?.authors}</Typography>
                </Box>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{padding:"30px 20px", backgroundColor:"#673bb7" , color:"white",display:"flex" , alignItems:"center", gap:"20px"}}>
                <Box sx={{width:"60px" , height:"60px" , borderRadius:"50%" , backgroundColor:"#f5f7fb",display:"flex" ,
                alignItems:"center" , justifyContent:"center"}}>
                    <ArticleIcon sx={{color:"#37474f", fontSize:"26px"}}/>
                </Box>
                <Box>
                    <Typography variant='h6'>الأراء</Typography>
                    <Typography sx={{fontWeight:"bold" , fontSize:"20px"}}>{data?.opinions}</Typography>
                </Box>
            </Paper>
        </Grid>
    </Grid>
    )
}

export default InformationBoxes