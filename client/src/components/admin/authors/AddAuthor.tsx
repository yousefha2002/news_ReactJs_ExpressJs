import { Box, Button, TextField, Typography , styled} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Editor from '../Editor';
import { useCallback, useMemo, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import {toast } from 'react-toastify';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';



const Image = styled("img")({
  width:"220px",
  height:"200px",
  objectFit:"cover",
  marginTop:"10px"
})

interface IFormInput {
    name: string;
    headline : string
  }

  const baseStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent:"center",
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };
  
  const focusedStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };


  type AddNewProps = {
    name?:string,
    headline?: string,
    isUpdate?: boolean,
    id?:number
  }

function AddAuthor({name  , headline , isUpdate , id}:AddNewProps) {
    const { control, handleSubmit  , formState: { errors },register} = useForm({
        defaultValues: {
            name: name || "",
            headline: headline || ""
        }
      });

      const [isLoad , setIsLoad] = useState<boolean>(false);
      const {token} = useSelector( (st : RootState) => st.admin);


    
      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if(!file && !isUpdate){
          toast(" الرجاء تحميل الصورة ",{position:"bottom-left", type:"error" , autoClose:1500});
          return;
        }
        setIsLoad(true);
        if(isUpdate){
          handelUpdate(data.name  , data.headline);
        }
        else{
          handelCreate(data.name , data.headline)
        }
      };

      
      const handelUpdate = async (name:string , headline:string) =>{
        try{
          const formData = new FormData();
          formData.append('name',name);
          formData.append('headline',headline);
          if(file){
            formData.append('image' ,file);
          }
          const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/author/${id}`,{
              method:"PUT",
              headers:{
                  "Authorization":token
              },
              body: formData
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
      }

      const handelCreate = async (name:string , headline:string) =>{
        try{
          const formData = new FormData();
          formData.append('name',name);
          formData.append('headline',headline);
          if(file){
            formData.append('image' ,file);
          }
          const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/author/add`,{
              method:"POST",
              headers:{
                  "Authorization":token
              },
              body: formData
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
      }

      const [file , setFile] = useState<File | null>(null);
      const onDrop = useCallback( (acceptedFiles:File[])=> {
        setFile(acceptedFiles[0]);
      }, [])

      const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: {'image/png':[],'image/jpg':[],'image/webp':[],'image/jpeg':[]} , onDrop:onDrop});
  
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{marginBottom:"20px"}}>
          <Controller
          control={control}
          {...register("name", { required: true })} 
          render={({ field }) => <TextField {...field} id="outlined-basic" label="إسم المؤلف" color='secondary' 
          variant="outlined" fullWidth sx={{maxWidth:"600px"}} autoComplete='off'/>
          }
          />
          {errors.name && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        </Box>
        <Box sx={{marginBottom:"20px"}}>
            <Controller
              control={control}
              {...register("headline", { required: true })} 
              render={({ field }) => <TextField {...field} id="outlined-basic" label="وصف قصير" color='secondary' 
              variant="outlined" fullWidth sx={{maxWidth:"600px"}} autoComplete='off'/>
              }
            />
            {errors.headline && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        </Box>
        <Box>
          <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>اسحب وأفلت بعض الملفات هنا ، أو انقر لتحديد الملفات</p>
          </div>
          {
            file && <Image src={URL.createObjectURL(file)}/>
          }
        </Box>
        {
          isLoad
          ?
          <Button variant='contained' sx={{marginTop:"20px" , width:"140px" , display:"block" , opacity:0.7}} color='secondary'>...</Button>
          :
          <Button variant='contained' sx={{marginTop:"20px" , width:"140px" , display:"block"}} type="submit" color='secondary'>
            {isUpdate?"حفظ التعديل":"حفظ"}
          </Button>
        }
    </form>
  )
}

export default AddAuthor