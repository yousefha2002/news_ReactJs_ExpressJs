import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import { Author } from '../../../types/Author';


export default function AdminAuthorBox({id , name , headline , image}:Author) {
    return (
        <Box sx={{backgroundColor:"#cfdde233",padding:"16px" , width:"100%"}}>
            <Box sx={{display:"flex" , alignItems:"center" , justifyContent:"space-between"}}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"12px"}}>
                    <Avatar sx={{width:"50px",height:"50px"}} src={`${process.env.REACT_APP_API_KEY}/images/${image}`}/>    
                    <Typography sx={{color:"#41798c",fontSize:"15px"}}>{name}</Typography>
                </Box>
                <Link to={`/admin/authors/edit/${id}`}>
                    <Tooltip title="تعديل">
                        <IconButton sx={{minWidth:"10px"}} color="info">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </Box>
            <Typography sx={{fontSize:"14px",marginTop:"12px",fontWeight:"500"}}>
                {headline}
            </Typography>   
        </Box>
    )
}
