import { Container, Grid } from '@mui/material'
import React from 'react'
import MainNewBox from './MainNewBox'
import { useMainNews } from '../../../hooks/useMainNews'

export default function MainNews() {
    const {data,isLoading} = useMainNews()
    return (
        <Container sx={{marginY:"30px",overflow:"hidden"}}>
            {
            !isLoading?
            <Grid container spacing={3}>
                <Grid container spacing={3} item xs={13}>
                    <Grid item spacing={3} xs={12} md={6}>
                        <MainNewBox big={true} dataNew={data?.news[0]}/>
                    </Grid>
                    <Grid container spacing={3} item xs={12} md={6}>
                        {
                            data?.news.slice(1,5).map((item,index)=>
                            {
                                return <Grid item key={index+'a1'} xs={12} sm={6}><MainNewBox dataNew={item}/></Grid>
                            })
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={3} item xs={12}>
                    {
                        data?.news.slice(5,9).map((item,index)=>
                        {
                            return <Grid item key={index+'a1'} xs={12} sm={6} md={3}><MainNewBox dataNew={item}/></Grid>
                        })
                    }
                </Grid>
            </Grid>
            :
            ""
            }
        </Container>
    )
}