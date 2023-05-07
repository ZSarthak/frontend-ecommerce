import * as React from 'react';
import Grid from '@mui/material/Grid';
import {TextField,Item} from '@mui/material'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from "axios"
const Login=({setIsLoggedIn,setIsAdmin})=>{
    const navigate=useNavigate();
    const [email,setEmail]=React.useState("");
    const [password,setPassword]=React.useState("");
    const handleClick =()=>{
       axios('http://localhost:8080/api/auth/signin',{
        method:"POST",
        data:{
            "username": email,
            "password": password
        }
       }).then((response)=>{
        if(response.status==200){
            setIsLoggedIn(true)
            localStorage.setItem("loggedUser",response.data.token);
            localStorage.setItem("user",email);
            if(email=="admin@ec.com"){ setIsAdmin(true);
              localStorage.setItem("isAdmin",true);
            }
            else {setIsAdmin(false);
              localStorage.setItem("isAdmin",false);
            }
            navigate("/home");
        } else{
            alert("please enter valid email/password");
        }
       }).catch((e)=>{
        alert("please enter valid email/password");
        console.log(e)
       })
    }
    return(
        <div>
            
            {/* <TextField id="Email Address" label="Email Address*" variant="outlined" />
            <TextField id="Password" label="Password*" variant="outlined" /> */}
<Box sx={{ width: '100%', position:'absolute', top:"100px" }}>
    <Grid container direction="column" columnSpacing={1}>
        <Grid item><h3>Sign in</h3></Grid>
  <Grid item xs={50} sx={{marginBottom:"10px"}}>
    <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email Address*" variant="outlined" />
  </Grid>
  <Grid item xs={50}>
    <TextField type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Password*" variant="outlined" />
  </Grid>
  </Grid>
  <Grid item>
  <Button 
  onClick={handleClick}
  variant="contained" sx={{ width: '14%', marginTop:"10px",
                backgroundColor: "#2A25BE",
                '&:hover': {
                  backgroundColor: "#D54035BF",
                },
              }}>SIGN IN</Button>
  </Grid>
  <Grid item>
  <a style={{cursor:"pointer", marginTop:"20px"}} onClick={()=>{navigate("/signup")}}>Don't have an account? Sign up</a>
  <ul>Copyright &#169;<Link to= "https://www.upgrad.com/">upGrad</Link> 2023</ul>
  </Grid>
  </Box>
        </div>
        
    )
};

export default Login;