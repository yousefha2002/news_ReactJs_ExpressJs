import { Grid } from '@mui/material'
import React ,{useState , useEffect}from 'react'
import AdminAuthorBox from './AuthorBox'
import { useAllAuthors } from '../../../hooks/useAuthors';
import MainBox from '../../skelton/MainBox';
import PaginationBox from '../../reusableUi/Pagenation';

function AdminViewAuthors() {
    const [page, setPage] = useState<number>(1);
    const {data , isLoading , refetch} = useAllAuthors(page);
    const [isLoad , setIsLoad] = useState(false);

    useEffect(()=>{
        setIsLoad(true);
        refetch();
        setIsLoad(false);
    },[page,refetch])

    
    return (
    isLoad || isLoading
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
            data?.authors.map(au=>{
                return <Grid item xs={12} sm={6} md={4} lg={3} key={au.id+"kn"}>
                <AdminAuthorBox id={au.id} name={au.name} headline={au.headline} image={au.image}/>
            </Grid>
            })
        }
    </Grid>
    <PaginationBox count={data?.totalPages||0} page={page} setPage={setPage}/>
    </>
  )
}

export default AdminViewAuthors