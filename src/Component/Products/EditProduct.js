import React , {useState , useEffect , Fragment ,useRef} from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography , TextField  } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import { Select, MenuItem } from '@mui/material';
import FormControl from '@mui/material/FormControl'
import Files from 'react-files';
import { Switch } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import { useDropzone } from 'react-dropzone';  
import ReactQuill from 'react-quill';  
import 'react-quill/dist/quill.snow.css';  
import Constant from "../Constant/Constant";



const EditProduct = () => {
    const { productid } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const controllerRef = useRef(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingRoles, setIsLoadingRoles] = useState(false); // New state for role loading
    const [category, setcategory] = useState([])
    const [size, setsize] = useState([])
    const [formData, setFormData]  = useState({
        name:"",
        category_id:"",
        size_id:"",
        visible:"1",
        photos: [],
        delete_photo_id:[],
        featured:""
    })

    useEffect(() => {

        get_product()
    }, []);

    const get_category = async (keyword) => {
        setIsLoadingRoles(true); 

        const { response, message } = await Helper.Get({
            url: api_Routes.category.view,
            data:{keywords:keyword},
            hasToken: true,
        })
        if (response) {
            setcategory([])
            response.data.forEach(ele => {
                setcategory(prev => [...prev, {
                    label: ele.name,
                    value: ele.id
                }])
            })
            setIsLoadingRoles(false);
        } else {
            console.log(message);
        }
    }
    const get_size = async (keyword) => {
        setIsLoadingRoles(true); 

        if(controllerRef.current){
            controllerRef.current.abort()
        }
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal

        const { response, message } = await Helper.Get_Abort({
            url: api_Routes.sizes.view,
            signal:signal,
            data:{keywords:keyword},
            hasToken: true,
        })
        if (response) {
            setsize([])
            response.data.forEach(ele => {
                setsize(prev => [...prev, {
                    label: ele.name,
                    value: ele.id
                }])
            })
            setIsLoadingRoles(false);
        } else {
            console.log(message);
        }
    }


    const get_product = async ()=>{
            
        const {response,message} = await Helper.Get({
            url:api_Routes.products.getOne(productid),
            hasToken:true,
           
        })
        if(response){

            console.log(response.data.translations)   
            setFormData({
                name:response.data.name,  
                photo:response.data.photo, 
                category_id:response.data.category_id,
                size_id:response.data.size.id,
                photos:response.data.photos,
                featured:response.data.featured,
            })
            get_category(response.data.category_name)
            get_size(response.data.size.name)
           
            setFiles(response.data.photo?[{
                preview: {type: 'image', url: response.data.photo}
            }]:"")

        }

    }

    console.log(formData)

    const handleChange = (key, value) => {
        console.log(value)
             {
                setFormData(prev => ({ ...prev, [key]: value }));
            }
        };

     const handleSubmit = async () => {
            let exit = false
setIsLoading(true);

            var form_data = new FormData();
            var updatedFormData = { ...formData };

            Object.keys(updatedFormData).forEach((key) => {
                if (key === "photo") {
                  
                    if (updatedFormData.photo instanceof File) {
                        form_data.append("file", updatedFormData.photo);
                    } 
                } else if (key === "photos") {
                    // Append new photos
                    updatedFormData.photos.forEach((file, index) => {
                        if (file instanceof File) {
                            form_data.append(`photos[]`, file); 
                        } else {
                            
                            console.log('Photo is not a file object:', file);
                        }
                    });
                }
                else if (key === "delete_photo_id") {
                    updatedFormData?.delete_photo_id?.forEach((id) => {
                        form_data.append("deleted_photos[]", id);
                    });
                }
                 else {
                    form_data.append(key, updatedFormData[key]);
                }
            });            
            if(exit){
                setIsLoading(false)
                return;
            }

            const { response, message } = await Helper.Post({
                url: api_Routes.products.update(productid) ,
                data: form_data,
                hasToken: true
            });

            if (response) {
                enqueueSnackbar(message,{variant:"success",anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                  }})       
                  navigate(`/Products`)     
                    setIsLoading(false);
            } else {
                let errorMessage = '';
                if (typeof message === "string") {
                    errorMessage = message;
                } else if (typeof message === "object") {
                    errorMessage = Object.values(message).flat().join(', ');
                }
                enqueueSnackbar(errorMessage, {
                    variant: "error",
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
                setIsLoading(false);
            }
        };  

        const [files, setFiles] = useState([]);
        
        function deleteFile(e) {
            setFiles([]);
            setFormData(prev=>({...prev,["photo"]:""}))
            return files
    
        }
        const onFilesChange = (files) => {
            setFiles(files)
            setFormData(prev=>({...prev,["photo"]:files[0]}))
            console.log(files);
        }
        const onFilesError = (error, file) => {
            setFormData(prev=>({...prev,["photo"]:""}))
            setFiles(file)
        }

        const onDrop = (acceptedFiles) => {  
            const filesWithPreview = acceptedFiles.map(file => Object.assign(file, {  
                url: URL.createObjectURL(file)  
            }));  
            setFormData(prev => ({ ...prev, photos: [...prev.photos, ...filesWithPreview] })); 
        };  
        
        const deleteFiles = (fileToDelete,id) => {  

            setFormData(prev => ({
                ...prev,
                photos: prev.photos.filter(file => file !== fileToDelete),
                delete_photo_id: id != (undefined) ? [...(prev.delete_photo_id || []), id] : prev.delete_photo_id
            }));  
        };  

        console.log(formData)
    
        const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });  
    


        return(
            <>
                <Container sx={{ marginBottom: "20px" }}>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Grid item>
                        <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Edit Product</Typography>
                    </Grid>
                    <Grid item>
                    <Button 
                        variant="contained" 
                        startIcon={isLoading ? <CircularProgress sx={{color:"white"}} size={22}/> : <AddIcon />} 
                        sx={{ 
                            backgroundColor: "#14213D ", 
                            fontSize: "13px", 
                            borderRadius: "7px", 
                            height: "38px",
                            '&:hover': {
                                backgroundColor: "#14213D " // Green color on hover
                            }
                        }} 
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    </Grid>
                </Grid>
                <Card>
                    <CardContent>
                        <h3>Basic information</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel className="inputlable">Name</InputLabel>
                                    <TextField 
                                      size="small"
                                        label="name" 
                                        variant="outlined" 
                                         fullWidth
                                        name="name" 
                                        value={formData.name} 
                                        onChange={(e)=>{handleChange("name",e.target.value)}} 
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Category</InputLabel>
                                    <FormControl sx={{ width: "100%" }}>
                                        <Autocomplete
                                          size="small"
                                            options={category}
                                            getOptionLabel={(option) => option.label}
                                            value={category.find((r) => r.value === formData.category_id) || null}
                                            onChange={(event, newValue) => {
                                                handleChange("category_id", newValue ? newValue.value : '');
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                get_category(newInputValue); // Fetch roles based on input
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="category"
                                                     sx={{ width: { xs: "100%", sm: "90%", md: "90%", lg: "152%" } }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {isLoadingRoles ? (
                                                                    <CircularProgress color="inherit" size={20} />
                                                                ) : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <InputLabel className="inputlable">Size</InputLabel>
                                    <FormControl sx={{ width: "100%" }}>
                                        <Autocomplete
                                          size="small"
                                            options={size}
                                            getOptionLabel={(option) => option.label}
                                            value={size.find((r) => r.value === formData.size_id) || null}
                                            onChange={(event, newValue) => {
                                                handleChange("size_id", newValue ? newValue.value : '');
                                            }}
                                            onInputChange={(event, newInputValue) => {
                                                get_size(newInputValue); // Fetch roles based on input
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="size"
                                                     sx={{ width: { xs: "100%", sm: "90%", md: "90%", lg: "152%" } }}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <>
                                                                {isLoadingRoles ? (
                                                                    <CircularProgress color="inherit" size={20} />
                                                                ) : null}
                                                                {params.InputProps.endAdornment}
                                                            </>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <InputLabel className="inputlable" >Featured</InputLabel>
                                    <Switch sx={{ color: "#D80621" }} checked={formData.featured == "1"} onChange={(e) => { handleChange("featured", e.target.checked ? 1 : 0) }} />
                                </Grid>
                            
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{ marginBottom: "50px" }}>
                <Card>
                    <CardContent>
                        <h3>Upload Image</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                        <Files
                                        className='files-dropzone fileContainer'
                                        onChange={onFilesChange}
                                        onError={onFilesError}
                                        accepts={['image/*']}
                                        multiple={false}
                                        maxFileSize={10000000}
                                        minFileSize={0}
                                        clickable
                                        >
                                                {
                                                    files.length > 0
                                                        ? <div style={{textAlign:"center"}}>
                                                            {files.map((file, index) =>
                                                                <div key={index}>
                                                                    <img width="400px" height="200px"  alt= "img" src= {`${file.preview.url}`}  />
                                                                </div>
                                                            )}
                                                        </div>

                                                        : <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
                                                            <Button sx={{backgroundColor:"#14213D ",color:"white",padding:"10px",'&:hover': {  backgroundColor: "#14213D ",color:"white"  }}} >Upload Image</Button>
                                                        </div>
                                                }
                                        </Files>
                                            {files.length > 0 ?
                                                <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"30px"}}>
                                                    <Button  onClick={() => deleteFile(files)} sx={{backgroundColor:"red",color:"white",padding:"8px 16px",'&:hover': {  backgroundColor: "red",color:"white"  }}}    >
                                                        Delete
                                                    </Button>
                                                </div> : ''
                                            }
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{ marginBottom: "50px" }}>
                <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>  
                    <CardContent>
                      <h3 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Upload Images</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                <div {...getRootProps({ className: 'dropzone' })}>  
                                    <input {...getInputProps()} />  
                                    <p>Drag 'n' drop some files here, or click to select files</p>  
                                    <Button sx={{ backgroundColor: "#14213D ", color: "white", marginTop: '10px' }}>Upload Images</Button>  
                                    {formData.photos.length > 0 && (  
                                         <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>   
                                            {formData.photos.map((file, index) => (  
                                                <div key={index} style={{ margin: '5px', width: '10%', position: 'relative' }}>  
                                                    <img src={file.url} alt="preview" style={{ width: '100px',height:"100px", borderRadius: '4px',maxWidth:"100%" }} />  
                                                    <button onClick={() => deleteFiles(file,file.id)}
                                                      style={{  
                                                        position: 'absolute',   
                                                        top: '5px',   
                                                        right: '5px',   
                                                        fontSize: '12px',  
                                                        backgroundColor: '#f44336',   
                                                        border:"1px solid white",
                                                        borderRadius:"6px",
                                                        color: 'white',
                                                        cursor:"pointer"  
                                                    }}>  
                                                        x  
                                                    </button>  
                                                </div>  
                                            ))}  
                                        </div>  
                                    )}  
                                </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            </>
        )


}
export default EditProduct;