import { Box, Button, TextField, Typography , styled} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Editor from '../Editor';
import { useCallback, useMemo, useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import { useCategories } from '../../../hooks/useCategories';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';



const Image = styled("img")({
  width:"220px",
  height:"200px",
  objectFit:"cover",
  marginTop:"10px"
})

interface IFormInput {
    title: string;
    category : string
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
    title?:string,
    description?:string,
    categoryId?: string,
    isUpdate?: boolean,
    newId?:number
  }

function AddNew({title , description , categoryId , isUpdate,newId}:AddNewProps) {
  const {data} = useCategories();
  
    const { control, handleSubmit  , formState: { errors },register} = useForm({
        defaultValues: {
            title: title || "",
            category: categoryId || ""
        }
      });
      

      const [editorText , setEditorText]=useState("");
      const {token} = useSelector( (st : RootState) => st.admin);
      const [isLoad , setIsLoad] = useState<boolean>(false);
      const [file , setFile] = useState<File | null>(null);


    
      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        if(isUpdate){
          handelUpdate(data.title , data.category);
        }
        else{
          handelCreate(data.title , data.category);
        }
      };

      const handelCreate = async(title:string ,category:string) => {
        if(!editorText){
          toast("إدخال وصف لخبر",{position:"bottom-left", type:"error" , autoClose:1500})
          return;
        }
        if(!file){
          toast(" الرجاء تحميل الصورة ",{position:"bottom-left", type:"error" , autoClose:1500});
          return;
        }
        setIsLoad(true);
        try{
          const formData = new FormData();
          formData.append('title' , title);
          formData.append('description' , editorText);
          formData.append('categoryId' , category);
          formData.append('image' , file);
          const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/create`,{
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

      const handelUpdate = async(title:string ,category:string) => {
        if(!editorText){
          toast("إدخال وصف لخبر",{position:"bottom-left", type:"error" , autoClose:1500})
          return;
        }
        setIsLoad(true);
        try{
          const formData = new FormData();
          formData.append('title' , title);
          formData.append('description' , editorText);
          formData.append('categoryId' , category);
          if(file){
            formData.append('image' , file);
          }
          const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/new/update/${newId}`,{
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
          {...register("title", { required: true })} 
          render={({ field }) => <TextField {...field} id="outlined-basic" label="عنوان الخبر" color='secondary' 
          variant="outlined" fullWidth sx={{maxWidth:"600px"}} autoComplete='off'/>
          }
          />
          {errors.title && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        </Box>
        <Box sx={{marginBottom:"20px"}}>
            <Controller
              control={control}
              {...register("category", { required: true })} 
              render={({ field }) => <FormControl fullWidth sx={{maxWidth:"600px"}}>
              <InputLabel id="demo-simple-select-label">القسم</InputLabel>
              <Select
              {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="القسم"
                defaultValue='1'
              >
                {
                  data && data?.categories.map(ca=>{
                    return <MenuItem key={ca.id+"ked"} value={`${ca.id}`}>{ca.title}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
              }
            />
            {errors.category && <Typography variant='h6' color="error" sx={{fontSize:"12px", marginTop:"12px"}}>هذا الحقل مطلوب</Typography>}
        </Box>
        <Box sx={{marginBottom:"20px"}}>
            <Editor updatedText={description?description:""} setEditorText={setEditorText}/>        
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
            !isLoad
            ?
            <Button variant='contained' sx={{marginTop:"20px" , width:"120px" , display:"block"}} type="submit" color='secondary'>
            {isUpdate?"حفظ التعديل":"حفظ"}
            </Button>
          :
          <Button variant='contained' sx={{marginTop:"20px" , width:"120px" , display:"block" , opacity:0.7}}  color='secondary'>
            ...
          </Button>
          }
    </form>
  )
}

export default AddNew