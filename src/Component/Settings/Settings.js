import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api_Routes } from "../../api_Route";
import { Helper } from "../../Tools/Helper";
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import { useSnackbar } from 'notistack';
import { Typography, Container, Card, CardContent, Box, Grid, Button, TextField } from "@mui/material";

const Setting = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        get_Setting();
    }, []);

    const get_Setting = async () => {
        const { response, message } = await Helper.Get({
            url: api_Routes.setting.view,
            hasToken: true,
        });

        if (response) {
            setFormData(response.data);
        } else {
            // Handle error here
        }
    };

    const handleChange = (id, value) => {
        const newData = formData.map(item => {
            if (item.id === id) {
                return { ...item, value: value };
            }
            return item;
        });
        setFormData(newData);
    };

    const formatData = () => {
        const formattedData = {};
        formData.forEach(item => {
            formattedData[item.id.toString()] = item.value;
        });
        return formattedData;
    };
    console.log(formData)

    const handleSubmit = async () => {
        setIsLoading(true);
        const formattedData = formatData();
        const { response, message } = await Helper.Post({
            url: api_Routes.setting.update,
            data: formattedData,
            hasToken: true,
        });

        if (response) {
            enqueueSnackbar("Updated Successfully", {
                variant: "success",
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });        } else {
            // Error handling
        }
        setIsLoading(false);
    };

    return (
        <Container maxWidth="lg">
            <Typography sx={{fontSize:"28px" , fontWeight:"600" , color:"#1e1b1b",marginBottom:"15px"}}>
                Settings
            </Typography>
            <Card>
                <CardContent>
                    <form noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            {formData.map(({ id, key, value }) => (<>
                                <Grid item xs={6} sm={3}  key={id} display={"flex"} >
                                    <InputLabel sx={{marginTop:"10px",color:"black",fontWeight:"600",fontSize:"17px"}}>{key} :</InputLabel>
                                </Grid>
                                
                                <Grid item xs={6} sm={3}  key={id} display={"flex"}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                        id={`input-${id}`}
                                        value={value}
                                        onChange={(e) => handleChange(id, e.target.value)}
                                        placeholder="Value"
                                        required
                                    />
                                </Grid>
                                {/* <Grid item xs={6} sm={2}  key={id} display={"flex"}>
                                   
                                </Grid> */}
                                </> ))}
                        </Grid>
                        <Box mt={3} display="flex" justifyContent="flex-end">
                            <Button 
                                variant="contained" 
                                startIcon={isLoading ? <CircularProgress sx={{color:"white"}} size={22}/> : ""} 
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
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Setting;
