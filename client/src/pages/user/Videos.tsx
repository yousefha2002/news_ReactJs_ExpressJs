import React, { useEffect, useState } from 'react'
import Layout from '../../components/user/Layout'
import {Container,Grid} from '@mui/material'
import HeaderTitle from '../../components/reusableUi/HeaderTitle'
import Video from '../../components/reusableUi/Video'
import { useAllVideos } from '../../hooks/useVideos'
import PaginationBox from '../../components/reusableUi/Pagenation'

export default function Videos() {
    const [page, setPage] = useState<number>(1);
    const {data , isLoading , refetch} = useAllVideos(page,16);
    const [isLoad , setIsLoad] = useState(false);

    useEffect(()=>{
        setIsLoad(true);
        refetch();
        setIsLoad(false);
    },[page,refetch]);

    return (
        <Layout>
            <Container sx={{marginY:"40px"}}>
                <HeaderTitle title="فيديو"/>
                {
                    isLoading || isLoad
                    ?
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Video/></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Video/></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Video/></Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}><Video/></Grid>
                    </Grid>
                :
                <>
                <Grid container spacing={2}>
                    {
                        data?.videos.map(vi=>{
                            return <Grid key={vi.id+"mkhje"} item xs={12} sm={6} md={4} lg={3}><Video video={vi}/></Grid>
                        })
                    }
                </Grid>
                <PaginationBox count={data?.totalPages||0} page={page} setPage={setPage}/>
                </>
                }
            </Container>
        </Layout>
    )
}
