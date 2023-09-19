import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Opinion } from '../../types/Opinion'

type Props = {
    opinion : Opinion
}

export default function OpinionAuthor({opinion}: Props) {
    return (
        <Link to={`/opinion/${opinion.id}`}>
            <Box sx={{backgroundColor:"#cfdde233",padding:"16px"}}>
                <Typography sx={{fontSize:"22px",fontWeight:"700",marginBottom:"16px"}}>{opinion.title?.slice(0,50)}</Typography>
                <Typography sx={{fontSize:"16px"}}>{opinion?.headLine?.slice(0,60)}</Typography>
            </Box>
        </Link>
    )
}
