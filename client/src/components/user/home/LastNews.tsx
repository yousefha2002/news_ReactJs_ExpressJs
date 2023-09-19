import { Box, Grid } from '@mui/material'
import React from 'react'
import DetailsNewBox from './DetailsNewBox'
import { useLastNews } from '../../../hooks/useLastNews'

export default function LastNews() {
    const {data,isLoading} = useLastNews()
    return (
        <Box>
            <Grid container spacing={2}>
                {
                    isLoading?
                    ""
                    :
                    data?.news.map((item,index)=>
                    {
                        return(
                            <Grid item xs={12} md={6} key={index+'a1'}><DetailsNewBox dataNew={item}/></Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}
