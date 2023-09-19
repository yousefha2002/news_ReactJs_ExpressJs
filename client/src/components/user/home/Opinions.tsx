import React from 'react'
import {Container, Grid} from '@mui/material'
import Opinion from '../../reusableUi/Opinion'
import HeaderTitle from '../../reusableUi/HeaderTitle'
import { Link } from 'react-router-dom'
import { useLastOpinions } from '../../../hooks/useLastOpinions'

export default function Opinions() {
    const {data,isLoading} = useLastOpinions()

    return (
        <Container sx={{marginY:"40px"}}>
            <Link to="/opinions"><HeaderTitle title="آراء"/></Link>
            <Grid container spacing={2}>
                {
                    isLoading?
                    ""
                    :
                    data?.opinions.map((opinion,index)=>
                    {
                        return <Grid key={index+'aqz'} item xs={12} sm={6} md={4} lg={3}>
                                <Opinion opinion={opinion}/>
                                </Grid>
                    })
                }
            </Grid>
        </Container>
    )
}
