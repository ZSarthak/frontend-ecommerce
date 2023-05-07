import * as React from 'react';
import Grid from '@mui/material/Grid';
import {TextField,Item} from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { EmailOutlined } from '@mui/icons-material';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
const Signup=()=>{
    const navigate=useNavigate();
    const [FirstName,setFirstName]=React.useState("");
    const [LastName,setLastName]=React.useState("");
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const [confirmpassword, setconfirmPassword]= React.useState("");
    const [contactNumber,setcontactNumber]=React.useState("");

    const handleClick=()=>{
    if(password===confirmpassword){
        axios("http://localhost:8080/api/auth/signup",{
            method:"POST",
            data:{
                "email": email,
                "role": [
                  "USER"
                ],
                "password": password,
                "firstName": FirstName,
                "lastName": LastName,
                "contactNumber": contactNumber
              }
        }).then((response)=>{
           if(response.status==200){
            alert("User Created Succesfully, Please Login");
            navigate("/login");
           }
        }).catch(e=>{
            console.log(e)
        })
    } else{
        alert("passwords must match!")
    }
    }

    return(
        <div>
            <Box sx={{ width: '100%', position:'relative', top:"10px", margin: "10px" }}>
    <Grid container direction="column" columnSpacing={1}>
        <Grid item> 
        <h3>Sign Up</h3>
        </Grid>
  <Grid item xs={10} sx={{marginBottom:"10px"}}>
    <TextField id="First name" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}} label="First Name*" variant="outlined" />
  </Grid>
  <Grid item xs={10} sx={{marginBottom:"10px"}}>
    <TextField id="Last name" value={LastName} onChange={(e)=>{setLastName(e.target.value)}} label="Last Name*" variant="outlined" />
  </Grid>
  <Grid item xs={10} sx={{marginBottom:"10px"}}>
    <TextField id="Email Address" value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email Address*" variant="outlined" />
  </Grid>
  <Grid item xs={10} sx={{marginBottom:"10px"}}>
    <TextField type="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Password*" variant="outlined" />
  </Grid>
  <Grid item xs={10} sx={{marginBottom:"10px"}}>
    <TextField type="password" value={confirmpassword} onChange={(e)=>{setconfirmPassword(e.target.value)}} label="Confirm Password*" variant="outlined" />
  </Grid>
  <Grid item xs={10} sx={{marginBottom:"10px"}}>
    <TextField id="Contact number" value={contactNumber} onChange={(e)=>{setcontactNumber(e.target.value)}} label="Contact Number*" variant="outlined" />
  </Grid>
  
  <Grid item>
    <Button 
  onClick={handleClick}
  variant="contained" sx={{ width: '14%', position:'relative', top:"14px", margin:"10px",
                backgroundColor: "#2A25BE",
                '&:hover': {
                  backgroundColor: "#D54035BF",
                },
              }}>SIGN IN</Button>
    </Grid>
    <Grid item>
  <a style={{cursor:"pointer", top:"100px"}} onClick={()=>{navigate("/Login")}}>Already have an account? Sign in</a>
  <ul>Copyright &#169;<Link to= "https://www.upgrad.com/">upGrad</Link> 2023</ul>
    </Grid> 
  </Grid>
  </Box>
  
        </div>
    )
};

export default Signup;