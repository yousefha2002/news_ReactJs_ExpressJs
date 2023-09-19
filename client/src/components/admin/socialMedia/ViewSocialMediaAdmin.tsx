import React from 'react'
import { useAllSocialmedia } from '../../../hooks/useSocialMedia'
import { SocialIcon } from 'react-social-icons';
import { Box, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';



function ViewSocialMediaAdmin() {
    const {data , refetch} = useAllSocialmedia();
    const {token} = useSelector((s:RootState) => s.admin);

    const handleDelete = async (id:number) :Promise<void> => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/socialmedia/${id}`,{
                method:"DELETE",
                headers:{
                    "Authorization":token
                },
            })
            const resData = await response.json();
            if(response.status!==200 &&response.status!==201)
            {
                throw new Error('failed occured')
            }
        }
        catch(err)
        {
            console.log(err)
        }
        refetch();
    }
    
  return (
        <Grid container spacing={2}>
            {
                data?.social.map(so=>{
                    return <Grid item xs={12} sm={6} md={4} lg={3} key={so.id+"mkjn"}>
                        <Paper sx={{padding:"20px" , textAlign:"center"}}>
                        <Box sx={{ display:"flex" , alignItems:"center" , justifyContent:"space-between", gap:"10px" , marginBottom:"10px"}}>
                            <Typography sx={{fontSize:"12px"}}>{so.Link.slice(0,30)}</Typography>
                            <SocialIcon url={so.Link} style={{width:"45px",height:"45px"}}/>
                        </Box>
                        <Tooltip title="حذف">
                        <IconButton sx={{minWidth:"10px"}} color="error" onClick={()=>handleDelete(so.id)}>
                            <DeleteOutlineIcon />
                        </IconButton>
                        </Tooltip>
                    </Paper>
                    </Grid>
                })
            }
        </Grid>
  )
}

export default ViewSocialMediaAdmin