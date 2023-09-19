import React from 'react'
import Layout from '../../components/user/Layout'
import HeaderTitle from '../../components/reusableUi/HeaderTitle'
import { Box, Container, Grid } from '@mui/material'
import Opinion from '../../components/reusableUi/Opinion'
import { Link } from 'react-router-dom'
import { useAllOpinionsWithCategories } from '../../hooks/useOpinions'
import Loading from '../../components/reusableUi/Loading'

export default function Opinions() {
    const {data , isLoading} = useAllOpinionsWithCategories();
    return (
        <Layout>
            <Container sx={{marginY:"40px"}}>
                {
                    isLoading
                    ?
                    <Loading/>
                    :
                    data?.categories.map(ca=>{
                        return <Box sx={{marginBottom:"40px"}} key={ca.id+"mkbh"}>
                        <Link to={`/opinions/${ca.id}`}>
                            <HeaderTitle title={ca.title}/>
                        </Link>
                        <Grid container spacing={2}>
                            {
                                ca.opinions.map(op=>{
                                    return <Grid key={op.id+"knjh"} item xs={12} sm={6} md={4} lg={3}><Opinion opinion={op}/></Grid>
                                })
                            }
                        </Grid>
                    </Box>
                    })
                }
            </Container>
        </Layout>
    )
}
