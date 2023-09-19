import { Box, Grid } from '@mui/material'
import React from 'react'
import DetailsNewBox from './DetailsNewBox'
import { useViewNews } from '../../../hooks/useViewNews'

export default function MostReadNews() {
    const {data,isLoading} = useViewNews()
    return (
        <Grid container spacing={2}>
            {
                isLoading?
                ""
                :
                data?.news.map((item,index)=>
                {
                    return(
                        <Grid item xs={12} md={6} key={index+'a1'}><DetailsNewBox views={true} dataNew={item}/></Grid>
                    )
                })
            }
        </Grid>
    )
}
