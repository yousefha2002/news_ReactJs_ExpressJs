import React, { useEffect, useState } from 'react'
import AdminVideoBox from './AdminVideoBox'
import { useAllVideos } from '../../../hooks/useVideos'
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import PaginationBox from '../../reusableUi/Pagenation';
import MainBox from '../../skelton/MainBox';
import { Box } from '@mui/material';

function AdminViewVideos() {

  const [page, setPage] = useState<number>(1);
  const {data , isFetching , refetch , isLoading} = useAllVideos(page,8);
  const {token} = useSelector( (st : RootState) => st.admin);
  const [isLoad , setIsLoad] = useState(false);



    useEffect(()=>{
      setIsLoad(true);
        refetch();
        setIsLoad(false);
    },[page,refetch])

    const handleDelete = async (id:number) :Promise<void> => {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/video/${id}`,{
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

    console.log(data);
    

  return (
    isLoading || isLoad
    ?
    <>
    <Box sx={{marginBottom:"20px"}}>
      <MainBox/>
    </Box>
    <Box sx={{marginBottom:"20px"}}>
      <MainBox/>
    </Box>
    <Box sx={{marginBottom:"20px"}}>
      <MainBox/>
    </Box>
    <Box sx={{marginBottom:"20px"}}>
      <MainBox/>
    </Box>
    </>
    :
    <>
    {
      data?.videos.map(vi=>{
        return <AdminVideoBox key={vi.id} video={vi} handleDelete={handleDelete}/>
      })
    }
    <PaginationBox count={data?.totalPages||0} page={page} setPage={setPage}/>
    </>
  )
}

export default AdminViewVideos