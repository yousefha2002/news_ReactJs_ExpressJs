import { Avatar, Box, Stack, Typography , Tooltip , IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Opinion } from '../../../types/Opinion';

type Props  = {
    opinion :Opinion,
    handleDelete:(id: number) => Promise<void>
}

export default function AdminOpinionBox({opinion,handleDelete}:Props) {
    return (
        <Box sx={{backgroundColor:"#cfdde233",padding:"16px"}}>
            <Typography sx={{fontSize:"17px",marginBottom:"24px",fontWeight:"700"}}
                >{opinion.title}
            </Typography>   
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"12px"}}>
                    <Avatar sx={{width:"45px",height:"45px"}}src={`${process.env.REACT_APP_API_KEY}/images/${opinion.author?.image}`}/>    
                    <Typography sx={{color:"#41798c",fontSize:"15px"}}>{opinion.author?.name}</Typography>
                </Box>
                <Stack direction={"row"}>
                    <Link to={`/admin/opinions/edit/${opinion.id}`}>
                        <Tooltip title="تعديل">
                            <IconButton sx={{minWidth:"10px"}} color="info">
                                <EditIcon sx={{fontSize:"20px"}}/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="حذف">
                        <IconButton sx={{minWidth:"10px"}} color="error" onClick={(e)=>handleDelete(opinion.id)}>
                            <DeleteOutlineIcon sx={{fontSize:"20px"}}/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
        </Box>
    )
}
