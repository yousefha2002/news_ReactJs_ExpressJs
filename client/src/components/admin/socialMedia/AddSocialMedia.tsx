import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
    title: string;
  }

function AddSocialMedia() {
    const { control, handleSubmit  , formState: { errors },register} = useForm({
        defaultValues: {
            title:"",
        }
      });

      const {token} = useSelector( (st : RootState) => st.admin);

      const [isLoad , setIsLoad] = useState<boolean>(false);
    
      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoad(true);
          try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/socialmedia/create`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({Link:data.title})
            })
            const resData = await response.json();
            setIsLoad(false);
            if(response.status!==200 &&response.status!==201)
            {
              toast(resData.message,{position:"bottom-left", type:"error" , autoClose:1500})
                throw new Error('failed occured')
            }
            toast(resData.message,{position:"bottom-left", type:"success" , autoClose:1500})
        }
        catch(err)
        {
          setIsLoad(false);
            console.log(err)
        }
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
        control={control}
        {...register("title", { required: true })} 
        render={({ field }) => <TextField {...field} id="outlined-basic" label="عنوان الرابط" color='secondary' 
        variant="outlined" fullWidth sx={{maxWidth:"600px"}} autoComplete='off'/>
        }
        />
        {errors.title && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        {
          isLoad
          ?
          <Button variant='contained' sx={{marginTop:"20px" , width:"100px" , display:"block" , opacity:0.7}} color='secondary'>...</Button>
          :
          <Button variant='contained' sx={{marginTop:"20px" , width:"100px" , display:"block"}} type="submit" color='secondary'
          >حفظ
          </Button>
        }
    </form>
  )
}

export default AddSocialMedia