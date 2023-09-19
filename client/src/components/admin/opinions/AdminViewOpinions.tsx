import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminOpinionBox from './AdminOpinionBox'
import { useAllOpinions } from '../../../hooks/useOpinions'
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import MainBox from '../../skelton/MainBox';
import PaginationBox from '../../reusableUi/Pagenation';

function AdminViewOpinions() {
    const [page, setPage] = useState<number>(1);
    const {data , isLoading , refetch} = useAllOpinions(page);
    const {token} = useSelector( (st : RootState) => st.admin);
    const [isLoad , setIsLoad] = useState(false);



    useEffect(()=>{
        setIsLoad(true);
        refetch();
        setIsLoad(false);
    },[page,refetch])

    const handleDelete = async (id:number) :Promise<void> => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/opinion/${id}`,{
                method:"DELETE",
                headers:{
                    "Authorization":token
                },
            })
            const resData = await response.json();
            if(response.status!==200 &&response.status!==201)
            {
                throw new Error('failed occured')
            }
        }
        catch(err)
        {
            console.log(err)
        }
        refetch();
    }
    
    
  return (
    isLoading || isLoad
    ?
    <Grid container spacing={2}>
        <Grid item sm={6} md={4} lg={3}>
            <MainBox/>
        </Grid>
        <Grid item sm={6} md={4} lg={3}>
            <MainBox/>
        </Grid>
        <Grid item sm={6} md={4} lg={3}>
            <MainBox/>
        </Grid>
        <Grid item sm={6} md={4} lg={3}>
            <MainBox/>
        </Grid>
    </Grid>
    :
    <>
    <Grid container spacing={2}>
        {
            data?.opinions?.map(op=>{
                return <Grid item sm={6} md={4} lg={3} key={op.id+"knjhb"}>
                    <AdminOpinionBox opinion={op} handleDelete={handleDelete}/>
                </Grid>
            })
        }
    </Grid>
    <PaginationBox count={data?.totalPages||0} page={page} setPage={setPage}/>
    </>
  )
}

export default AdminViewOpinions