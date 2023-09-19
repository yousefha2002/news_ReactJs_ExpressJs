import { Box,Typography,styled } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'
import { New } from '../../../types/News';

type props = {
    big?:boolean,
    dataNew?:New
}

const CategoryText = styled(Typography)({
    backgroundColor:"#b80000",
    color:"white",
    width:"fit-content",
    fontSize:"14px",
    padding:"2px 8px",
    fontWeight:"600",
})

export default function MainNewBox({big,dataNew}:props) {
    const Wrapper = styled(Box)({
        width:"100%",
        height:!big?"164px":"352px",
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:'no-repeat',
        position:"relative",
    })

    return (
        <Link to={`/news/${dataNew?.id}`}>
            <Wrapper 
            sx={{backgroundImage:`url('${process.env.REACT_APP_API_KEY}/images/${dataNew?.image}')`}}>
                <Box sx={{padding:"8px"}}>
                    <CategoryText>{dataNew?.category?.title}</CategoryText>
                </Box>
                <Box sx={{position:"absolute",bottom:0,paddingY:"4px",textAlign:"center",left:0,width:"100%",backgroundColor:"#000000ab",color:"white"}}>
                    <Typography sx={{paddingX:"4px"}}>
                        {big?dataNew?.title?.slice(0,80):dataNew?.title?.slice(0,30)}
                    </Typography>
                </Box>
            </Wrapper>
        </Link>
    )
}