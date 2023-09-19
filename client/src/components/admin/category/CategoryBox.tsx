import React from 'react'
import { Box, Typography , Tooltip , IconButton} from '@mui/material'
import { Category } from '../../../types/Categories'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

type props = {
  category : Category
}

function CategoryBox({category}:props) {
  return (
    <Box sx={{backgroundColor:"#cfdde233",padding:"16px"}}>
        <Box sx={{display:"flex" , alignItems:"center" , justifyContent:"space-between"}}>
          <Typography sx={{fontSize:"14px",marginBottom:"16px",fontWeight:"700"}}
              >
                قسم : {category.title}
          </Typography>   
          <Link to={`/admin/categories/edit/${category.id}`}>
            <Tooltip title="تعديل">
                <IconButton sx={{minWidth:"10px"}} color="info">
                    <EditIcon />
                </IconButton>
            </Tooltip>
          </Link>
        </Box>
        <Box sx={{display:"flex",columnGap:"12px" , flexDirection:"column"}}>
            <Typography sx={{color:"#41798c",fontSize:"15px"}}> عدد الأخبار : {category.news.length}</Typography>
            <Typography sx={{color:"#41798c",fontSize:"15px"}}> عدد الأراء : {category.opinions.length}</Typography>
        </Box>
    </Box>
  )
}

export default CategoryBox