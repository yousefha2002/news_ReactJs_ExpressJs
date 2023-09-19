import React from 'react'
import { Paper , Typography , Box} from '@mui/material'
import AdminLayout from '../../components/admin/AdminLayout'
import InformationBoxes from '../../components/admin/Land/InformationBoxes'
import MostNewsTable from '../../components/admin/Land/MostNewsViewTable'

function AdminLand() {
  return (
    <AdminLayout>
      <InformationBoxes/>
      <Box sx={{marginTop:"50px"}}>
        <Typography marginBottom={"20px"} variant='h5'>أكثر الاخبار زيارة : </Typography>
        <Paper>
          <MostNewsTable/>
        </Paper>
      </Box>
    </AdminLayout>
  )
}

export default AdminLand