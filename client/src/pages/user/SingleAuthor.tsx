import { Box, Container,Grid,Typography,styled } from '@mui/material'
import React ,{useState , useEffect} from 'react'
import Layout from '../../components/user/Layout'
import OpinionAuthor from '../../components/user/OpinionAuthor'
import { useAuthorOpinions, useSingleAuthor } from '../../hooks/useAuthors'
import { useParams } from 'react-router-dom'
import PaginationBox from '../../components/reusableUi/Pagenation'

const Image = styled('img')({width:"180px",height:"180px",borderRadius:"8px"})

export default function SingleAuthor() {
    const {authorId} = useParams();
    const {data : author} = useSingleAuthor(authorId||"");
    const [page, setPage] = useState<number>(1);
    const {data : opinions , refetch} = useAuthorOpinions(page,authorId||"");

    useEffect(()=>{
        refetch();
    },[page,refetch])
    
    return (
        <Layout>
            <Container sx={{marginY:"40px"}}>
                <Box sx={{display:"flex",alignItems:"center",columnGap:"20px",marginBottom:"40px"}}>
                    <Image src={`${process.env.REACT_APP_API_KEY}/images/${author?.author.image}`}/> 
                    <Box>
                    <Typography sx={{color:"#41798c",marginBottom:"10px",fontSize:"26px",fontWeight:"700"}}>{author?.author.name}</Typography>
                    <Typography sx={{color:"#000000",fontSize:"18px",fontWeight:"500"}}>{author?.author.headline}</Typography>
                    </Box>
                </Box>
                <Grid container spacing={2}>
                    {
                        opinions?.opinions.map(op=>{
                            return <Grid key={op.id+"mkj"} item xs={6}><OpinionAuthor opinion={op}/></Grid>
                        })
                    }
                </Grid>
                <PaginationBox count={opinions?.totalPages||0} page={page} setPage={setPage}/>
            </Container>
        </Layout>
    )
}
