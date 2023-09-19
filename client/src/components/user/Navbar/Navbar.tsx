import './navbar.css'
import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCategories } from '../../../hooks/useCategories'

export default function Navbar() {
    const {data,isLoading} = useCategories()
    return (
        <Box>
            <Container sx={{paddingY:"6px",overflowX:"auto",width:"100%",marginTop:"6px"}} className="links">
                <Box sx={{display:"flex",columnGap:"28px",width:"700px"}}>
                    {
                        !isLoading&&
                        data?.categories.map((category,index)=>
                        {
                            return(
                                <Link key={index+'q1'} to={`/${category.id}/news`} className='link'>
                                    <Typography>{category.title}</Typography>
                                </Link>
                            )
                        })
                    }
                </Box>
            </Container>
            <Divider/>
        </Box>
    )
}