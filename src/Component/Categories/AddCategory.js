import React , {useState , useEffect , Fragment} from "react";
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography , TextField } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import Files from 'react-files';


const AddCategory = () => {
    const navigate = useNavigate() 
    const [isloading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData]  = useState({
        name:"",
        parent:0,
    })

    const handleChange = (key , value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

      const handleSubmit = async () => {

        if (!formData.name   ) {
            enqueueSnackbar("Please add name ",{variant:"error",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
    setIsLoading(false);
    return;
}
        setIsLoading(true);

        var form_data = new FormData();
        var updatedFormData = { ...formData };
      
        Object.keys(updatedFormData).forEach((key) => {
            
            if (key === "photo")
                form_data.append("file", updatedFormData.photo);
            else
                form_data.append(key, updatedFormData[key]);
    });
    
         form_data.append("_method","PUT")
        const { response, message } = await Helper.Post({
            url: api_Routes.category.add,
            data: form_data,
            hasToken: true
        });

        if (response) {
            enqueueSnackbar(message,{variant:"success",anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
              }})
                setIsLoading(false);
                navigate('/categories')
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

        return(
            <>
                <Container sx={{ marginBottom: "20px" }}>
                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <Grid item>
                        <Typography sx={{ fontSize: "28px", fontWeight: "600", color: "#1e1b1b" }}>Add Category</Typography>
                    </Grid>
                    <Grid item>
                    <Button 
                        variant="contained" 
                        startIcon={isloading ? <CircularProgress sx={{color:"white"}} size={22}/> : <AddIcon />} 
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
                    <h3 style={{fontWeight:500,marginBottom:"30px"}}>Basic Information</h3>
                        <Box component="form" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                  <InputLabel className="inputlable">Category Name</InputLabel>
                                    <TextField 
                                    sx={{width:{xs:"100%",sm:"auto"}}}
                                        label=" name" 
                                        variant="outlined" 
                                          size="small"
                                        name="name" 
                                        value={formData.name} 
                                        onChange={(e)=>{handleChange("name",e.target.value)}} 
                                    />
                                </Grid>
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
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>

            </>
        )

}
export default AddCategory;