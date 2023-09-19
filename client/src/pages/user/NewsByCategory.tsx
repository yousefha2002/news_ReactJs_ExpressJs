import React , {useEffect , useState}from 'react'
import Layout from '../../components/user/Layout'
import {Container,Grid} from '@mui/material'
import HeaderTitle from '../../components/reusableUi/HeaderTitle'
import NewBox from '../../components/reusableUi/NewBos'
import { useParams } from 'react-router-dom'
import { useAllNewsByCategory } from '../../hooks/useNews'
import Loading from '../../components/reusableUi/Loading'
import PaginationBox from '../../components/reusableUi/Pagenation'

export default function NewsByCategory() {
    const {category} = useParams();
    const [page, setPage] = useState<number>(1);
    const {data , isLoading , refetch} = useAllNewsByCategory(page, category||"");

    

    useEffect(()=>{
        setPage(1)
    },[category])

    useEffect(()=>{
        refetch();
    },[page,refetch])
    
    return (
        <Layout>
            <Container sx={{marginY:"40px" , minHeight:"50vh"}}>
                {
                    isLoading
                    ?
                    <Loading/>
                    :
                    <>
                    <HeaderTitle title={data?.category.title||""}/>
                    <Grid container spacing={2}>
                        {
                            data?.news.map(n=>{
                                return <Grid key={n.id+"keb"} item xs={12} sm={6} md={4} lg={3}><NewBox news={n}/></Grid>
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
