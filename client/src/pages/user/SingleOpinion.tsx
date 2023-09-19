import React from 'react'
import Layout from '../../components/user/Layout'
import { Container, Grid, Typography,Box } from '@mui/material'
import {useParams} from 'react-router-dom'
import { useSingleNew } from '../../hooks/useNews'
import Loading from '../../components/reusableUi/Loading'
import SingleNewDetails from '../../components/user/SingleNewDetails'
import { useSingleOpinion } from '../../hooks/useOpinions'

export default function SingleOpinion() {
    const {opinionId} = useParams()
    const {data,isLoading} = useSingleOpinion(opinionId||'')

    return (
        <Layout>
            <Container sx={{marginY:"40px"}}>
                {
                    isLoading?
                    <Loading/>
                    :
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} lg={7}>
                            <SingleNewDetails isOpinion={true} newData={data?.opinion}/>
                        </Grid>
                        <Grid item xs={12} md={4} lg={5} sx={{justifyContent:"center",display:"flex"}}>
                            <Box sx={{position:{md:"fixed"}}}>
                                <Typography sx={{color:"#595959",fontWeight:"700",textAlign:"center",fontSize:"18px"}}>إعلان</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                }
            </Container>
        </Layout>
    )
}
