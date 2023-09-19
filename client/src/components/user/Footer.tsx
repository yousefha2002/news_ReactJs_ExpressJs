import { Container,Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { useAllSocialmedia } from '../../hooks/useSocialMedia';

type props = {
    color?:boolean
}

export default function Footer({color}:props) {
    const {data} = useAllSocialmedia();
    return (
        <Box sx={{backgroundColor:color?"white":"#f7f7f9",marginTop:"30px",paddingY:"30px"}}>
            <Container>
                <Box sx={{marginBottom:"20px",display:"flex",justifyContent:"center",alignItems:"center",columnGap:"20px"}}>
                    {
                        data?.social.map(so=>{
                            return <SocialIcon key={so.id+"neh"} url={so.Link} style={{width:"35px",height:"35px"}}/>
                        })
                    }
                </Box>
                <Divider/>
                <Typography sx={{marginTop:"20px",marginBottom:"20px",textAlign:"center",fontSize:"15px"}}>
                    &copy; جميع الحقوق محفوظة لموقع مجلتي {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    )
}
