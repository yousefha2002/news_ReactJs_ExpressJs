import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' , justifyContent:"center" , alignItems:"center", height:"calc(100vh - 120px)"}}>
      <CircularProgress size={100} thickness={2}/>
    </Box>
  );
}