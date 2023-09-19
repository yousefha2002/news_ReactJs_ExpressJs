import { Grid } from '@mui/material'
import React from 'react'
import CategoryBox from './CategoryBox'
import { useCategories } from '../../../hooks/useCategories'
import CategorySkelton from '../../skelton/CategorySkelton';

function AllCategories() {
  const {data , isLoading} = useCategories();
  
  
  return (
    isLoading
    ?
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}><CategorySkelton/></Grid>
    </Grid>
    :
    <Grid container spacing={2}>
        {
          data?.categories.map((ca)=>{
            return <Grid key={ca.id+";lok"} item xs={12} sm={6} md={4} lg={3}><CategoryBox category={ca}/></Grid>
          })
        }
    </Grid>
  )
}

export default AllCategories