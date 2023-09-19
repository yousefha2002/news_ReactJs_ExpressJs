import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Opinion } from '../../types/Opinion'

type props = {
    opinion?:Opinion
}

export default function OpinionBox({opinion}:props) {
    return (
        <Box sx={{backgroundColor:"#cfdde233",padding:"16px"}}>
            <Link to={`/opinion/${opinion?.id}`}>
                <Typography sx={{fontSize:"18px",marginBottom:"24px",fontWeight:"700"}}
                    >{opinion?.title?.slice(0,20)} 
                </Typography>  
            </Link> 
            <Link to={`/authors/${opinion?.author?.id}`}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"12px"}}>
                    <Avatar sx={{width:"50px",height:"50px"}} src={`${process.env.REACT_APP_API_KEY}/images/${opinion?.author?.image}`}/>    
                    <Typography sx={{color:"#41798c",fontSize:"15px"}}>{opinion?.author?.name}</Typography>
                </Box>
            </Link>
        </Box>
    )
}
