import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function Order(){
  const navigate=useNavigate();
  const {id,quantity}=useParams();
  const address=localStorage.getItem('address');
    const [Name,setName]=React.useState("");
    const [Category,setCategory]=React.useState("");
    const [AvailableItem,setAvailableItem]=React.useState("");
    const [Price, setPrice]= React.useState("");
    const [Image,setImage]=React.useState("");
    const [ProductDescription,setProductDescription]=React.useState("");
    React.useEffect(()=>{
      (async()=>{
        try{
        const response=await axios('http://localhost:8080/api/products/'+id)
        setName(response.data.name);
        setCategory(response.data.category);
        setAvailableItem(response.data.availableItems);
        setPrice(response.data.price);
        setProductDescription(response.data.description)
        setImage(response.data.imageUrl);
        } catch(e){
          alert('Error something went wrong');
        }
      })();
    },[])
  return (
    <Box>
        <Grid container direction={"row"}>
            <Grid item lg={6} md={6} sm={6}>
            <Grid container direction={"column"}>
                    <Grid item>
                        <h4>{Name}</h4>
                    </Grid>
                    <Grid item>
                    Quantity:{quantity}
                    </Grid>
                    <Grid item>
                        Category: <span style={{fontWeight:'bold'}}>{Category}</span>
                    </Grid>
                    <Grid item>
                    {ProductDescription}
                    </Grid>
                    <Grid item sx= {{fontSize:'25px', color:'red'}}>
                    &#8377; {+quantity*(+Price)}
                    </Grid>

                    <Grid item>
                    <Button variant="contained" onClick= {()=>navigate(`/details/${id}`)}>Back</Button>
                    <Button variant="contained" onClick= {()=>navigate(`/address/${id}/${quantity}`)} >Next</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Box>
                    <Box>
                        <h3>
                        Address
                        </h3>
                    </Box>
                    <Box>
                        {address}
                    </Box>
                </Box>
            </Grid>
        </Grid>
        <Button variant="contained" onClick= {()=>navigate(`/address/${id}/${quantity}`)}>Back</Button>
    <Button variant="contained"  
    onClick={()=>{
        (async()=>{
          try{
            const response=axios('http://localhost:8080/api/orders',{
              method:"POST",
              data:{
                    "id": id,
                    "quantity": +quantity,
                    "user": localStorage.getItem("user"),
                    "product": id,
                    "address": address
                  
              },
              headers:{
                "Authorization" : `Bearer ${localStorage.getItem("loggedUser")}`
            }
            })
            if(response.data!=""){
              alert("Order Placed Successfully!");
              navigate('/home')
            } else{
              alert('Error something went wrong');
            }
          }catch(e){
            alert('Error something went wrong');
          }
        })();
      }}
    >Place Order</Button>
    </Box>
  );
}