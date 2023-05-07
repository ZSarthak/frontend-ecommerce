import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Select,MenuItem} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';

const textFieldStyle={width:"60%"};
const defaultAddress={
    name:"",
    contact:"",
    street:"",
    city:"",
    state:"",
    landmark:"",
    zipCode:""
};
export default function Address() {
    const navigate=useNavigate();
    const {id,quantity}=useParams();
    const [address,setAddress]=React.useState(defaultAddress);
    const [selectedAddress,SetSelectedAddress]=React.useState("");
    React.useEffect(()=>{
        SetSelectedAddress(`${address.name}
        Contact Number: ${address.contact}
        ${address.street}
        ${address.city}
        ${address.state}
        ${address.landmark}
        ${address.zipCode}
        `);
    },[address]);
    
  return (
    <Box

    component="form"
    noValidate
    autoComplete="off"
  >
    <Grid container direction="column" rowSpacing={2.5} sx={{margin:"8px auto", width:"600px"}}>
      <Grid item><h3>Add Address</h3></Grid>

      <Grid item>
      <Box>
        <Box>
            Select Address
        </Box>
        <Box>
        <Select
        sx={textFieldStyle}
    value={selectedAddress}
    onChange={(e)=>{setAddress(defaultAddress); setTimeout(()=>SetSelectedAddress(e.target.value),300); }}
  >
    <MenuItem value={"Lucknow Police station Contacgt 1233456789 560015"}>Lucknow Police station Contacgt 1233456789 560015</MenuItem>
  </Select >
        </Box>
      </Box>
      </Grid>

      <Grid item>
      <TextField label="Name*" value={address.name} onChange={(e)=>{setAddress({...address,name:e.target.value})}}variant="outlined" sx={textFieldStyle}/>
      </Grid>

      <Grid item>
      <TextField label="Contact Number*" value={address.contact} onChange={(e)=>{setAddress({...address,contact:e.target.value})}}  variant="outlined" sx={textFieldStyle}/>
      </Grid>

      <Grid item >
      <TextField label="Street*" value={address.street} onChange={(e)=>{setAddress({...address,street:e.target.value})}} variant="outlined" sx={textFieldStyle}/>
      </Grid>
    
      <Grid item >
      <TextField label="City*" value={address.city} onChange={(e)=>{setAddress({...address,city:e.target.value})}} variant="outlined" sx={textFieldStyle}/>
      </Grid>
    
      <Grid item >
      <TextField label="Landmark" value={address.landmark} onChange={(e)=>{setAddress({...address,landmark:e.target.value})}} variant="outlined" sx={textFieldStyle}/>
      </Grid>
    

      <Grid item >
      <TextField label="Zip Code" value={address.zipCode} onChange={(e)=>{setAddress({...address,zipCode:e.target.value})}} variant="outlined" sx={textFieldStyle}/>
      </Grid>
      <Grid item >
      <Button variant="contained" sx={{width:"180px", padding:"5px"}} onClick={()=>{
        
      }}>Save Address</Button>
      </Grid>
    <Grid item>
    <Button variant="contained" onClick= {()=>navigate(`/confirm/${id}/${quantity}`)}>Back</Button>
    <Button variant="contained" onClick= {()=>{
        localStorage.setItem('address',selectedAddress)
        navigate(`/order/${id}/${quantity}`)}} >Next</Button>
    </Grid>
    </Grid>
    </Box>
  );
}