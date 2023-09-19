import React from 'react'
import { New } from '../../types/News'
import { Box, Typography,styled ,Avatar} from '@mui/material'
import moment from 'moment'
import { Opinion } from '../../types/Opinion'
import { Link } from 'react-router-dom'

type props = {
    newData:Opinion | undefined ,
    isOpinion?:boolean
}

const Image = styled('img')({
    width:"100%",
    maxHeight:"400px"
})

export default function SingleNewDetails({newData,isOpinion}:props) {
    return (
        <Box>
            <Typography sx={{fontSize:{md:"28px",lg:"24px",xs:"18px"},fontWeight:"700",marginBottom:"38px"}}>{newData?.title}</Typography>
            {isOpinion&&
                <Link to={`/authors/${newData?.author?.id}`}>
                <Box sx={{marginBottom:"40px",display:"flex",columnGap:"12px",alignItems:"center"}}>
                    <Avatar sx={{width:"60px",height:"60px"}} src={`${process.env.REACT_APP_API_KEY}/images/${newData?.author?.image}`}/>
                    <Typography sx={{color:"#333",fontWeight:"700"}}>{newData?.author?.name}</Typography>
                </Box>
            </Link>
            }
            <Image src={`${process.env.REACT_APP_API_KEY}/images/${newData?.image}`} alt={newData?.title}/>
            <Box sx={{marginY:"16px",position:"relative"}} className="date_design">
                <Box sx={{paddingX:"10px",color:"#595959",display:"flex",justifyContent:"space-between"}}>
                    <Typography>{moment(newData?.createdAt).calendar()}</Typography>
                    <Typography>آخر تحديث {moment(newData?.createdAt).calendar()}</Typography>
                    <Typography>{moment(newData?.createdAt).format('LT')}</Typography>
                </Box>
            </Box>
            <Box dangerouslySetInnerHTML={{__html:newData?.description||""}} sx={{marginY:"40px"}}/>
        </Box>
    )
}
