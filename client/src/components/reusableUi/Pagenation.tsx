import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

type props ={
    count:number,
    page:number,
    setPage:React.Dispatch<React.SetStateAction<number>>
}

export default function PaginationBox({count , page ,setPage}:props) {

  const handlePageChange = (event:React.ChangeEvent<unknown>, page:number) => {
    setPage(page);
  };

  

  return (
    <Box marginTop={"30px"} sx={{justifyContent:"center", display:"flex"}}>
      <Pagination count={count} color="secondary" onChange={handlePageChange}  page={page}/>
    </Box>
  );
}