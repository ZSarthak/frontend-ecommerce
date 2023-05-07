import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const textFieldStyle={width:"60%"};
export default function Details() {
  const navigate=useNavigate();
  const {id}=useParams();
    const [Name,setName]=React.useState("");
    const [Category,setCategory]=React.useState("");
    const [Quantity,setQuantity]=React.useState("");
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
        setImage(response.data.imageUrl);
        setQuantity(response.data.quantity);
        } catch(e){
          alert('Error something went wrong');
        }
      })();
    },[])
  return (
    <Box>
        <Grid container direction={"row"}>
            <Grid item>
            <Box> 
            <img src={Image} style={{height:"250px",width:"250px"}}/>
          </Box>
            </Grid>
            <Grid item>
                <Grid container direction={"column"}>
                    <Grid item>
                        <Box sx={{display:"flex"}}>
                            <h4>{Name}</h4>
                            <Box sx={{alignSelf:"center", marginLeft:"20px",}} style={{color:'white', borderRadius:'50%',padding:'5px 30px', background:'#3f51b5'}}>
                                Available Quantity: {AvailableItem}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        Category: <span style={{fontWeight:'bold'}}>{Category}</span>
                    </Grid>
                    <Grid item sx= {{fontSize:'25px', color:'red'}}>
                    &#8377; {Price}
                    </Grid>
                    <Grid item>
                    <TextField label="Enter Quantity*" value={Quantity} onChange={(e)=>{setQuantity(e.target.value)}} variant="outlined" />
                    </Grid>
                    <Grid item>
                    <Button onClick= {()=>navigate(`/confirm/${id}/${Quantity}`)} variant="contained">Place Order</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
}