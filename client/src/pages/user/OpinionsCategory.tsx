import React, { useEffect, useState } from 'react'
import Layout from '../../components/user/Layout'
import HeaderTitle from '../../components/reusableUi/HeaderTitle'
import { Box, Container, Grid } from '@mui/material'
import Opinion from '../../components/reusableUi/Opinion'
import { Link, useParams } from 'react-router-dom'
import { useAllOpinionsByCategory } from '../../hooks/useOpinions'
import Loading from '../../components/reusableUi/Loading'
import PaginationBox from '../../components/reusableUi/Pagenation'

export default function OpinionsCategory() {
    const {categId} = useParams();
    const [page, setPage] = useState<number>(1);
    const {data , isLoading , refetch} = useAllOpinionsByCategory(categId||"",page);
    const [isLoad , setIsLoad] = useState(false);

    useEffect(()=>{
        setIsLoad(true);
        refetch();
        setIsLoad(false);
    },[page,refetch])
    return (
        <Layout>
            <Container sx={{marginY:"40px" , minHeight:"50vh"}}>
                {
                    isLoading || isLoad
                    ?
                    <Loading/>
                    :
                    <Box>
                        <HeaderTitle title={data?.title||""}/>
                        <Grid container spacing={2}>
                        {
                            data?.opinions.map(op=>{
                                return <Grid key={op.id+"knjh"} item xs={12} sm={6} md={4} lg={3}><Opinion opinion={op}/></Grid>
                            })
                        }
                        </Grid>
                        <PaginationBox page={page} setPage={setPage} count={data?.totalPages||0}/>
                    </Box>
                }
            </Container>
        </Layout>
    )
} 
