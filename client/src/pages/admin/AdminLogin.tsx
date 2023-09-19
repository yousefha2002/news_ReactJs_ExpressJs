import React, { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box , TextField , Typography , Button , styled} from '@mui/material'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../redux/adminSlice';



interface IFormInput {
    email: string;
    password : string
}

const Form = styled('form')({
    padding:"40px 20px",
    width:"500px",
    maxWidth:"100%",
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    margin:"0 12px",
}) 

const Wrapper =styled('div')({
    height:"100vh",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
})

function AdminLogin() {
    const { control, handleSubmit  , formState: { errors },register} = useForm({
        defaultValues: {
            email:  "",
            password:  ""
        }
    });

    const [isLoad , setIsLoad] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoad(true);
      try{
          const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/auth/admin/login`,{
              method:"POST",
              headers:{
                  'Content-Type':"application/json"
              },
              body:JSON.stringify({...data})
          })
          const resData = await response.json();
          setIsLoad(false);
          if(response.status!==200 &&response.status!==201)
          {
            toast(resData.message,{position:"top-center", type:"error" , autoClose:1500})
              throw new Error('failed occured')
          }
          toast("تم تسجيل الدخول بنجاح",{position:"top-center", type:"success" , autoClose:1500})
          dispatch(loginAdmin({admin:resData.admin , token:resData.token}));
          navigate('/admin');
      }
      catch(err)
      {
        setIsLoad(false);
          console.log(err)
      }
    };


    return (
   <Wrapper>
     <Form onSubmit={handleSubmit(onSubmit)}>
        <Typography marginBottom={"20px"} sx={{fontSize:"20px"}}>صفحة تسجيل دخول الادمن</Typography>
        <Box sx={{marginBottom:"20px"}}>
          <Controller
          control={control}
          {...register("email", { required: true })} 
          render={({ field }) => <TextField {...field} id="outlined-basic" label="الإيميل" color='secondary' 
          variant="outlined" fullWidth autoComplete='off'/>
          }
          />
          {errors.email && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        </Box>
        <Box sx={{marginBottom:"20px"}}>
          <Controller
          control={control}
          {...register("password", { required: true })} 
          render={({ field }) => <TextField {...field} inputProps={{type:"password"}} id="outlined-basic" label="كلمة المرور" color='secondary' 
          variant="outlined" fullWidth/>
          }
          />
          {errors.password && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        </Box>
        {
            isLoad
            ?
            <Button variant='contained' sx={{marginTop:"20px" , width:"160px" , display:"block" , opacity:0.7}}>...</Button>
            :
            <Button variant='contained' sx={{marginTop:"20px" , width:"160px" , display:"block"}} type="submit" >تسجيل الدخول</Button>
        }
    </Form>
   </Wrapper>
    )
}

export default AdminLogin