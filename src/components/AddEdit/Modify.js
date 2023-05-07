import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const textFieldStyle={width:"60%"};
export default function Modify() {
  const navigate=useNavigate();
  const {id}=useParams();
    const [Name,setName]=React.useState("");
    const [Category,setCategory]=React.useState("");
    const [Manufracturer,setManufracturer]=React.useState("");
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
        setManufracturer(response.data.manufacturer);
        setAvailableItem(response.data.availableItems);
        setPrice(response.data.price);
        setImage(response.data.imageUrl);
        setProductDescription(response.data.description);
        } catch(e){
          alert('Error something went wrong');
        }
      })();
    },[])
  return (
    <Box

      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container direction="column" rowSpacing={2.5} sx={{margin:"8px auto", width:"600px"}}>
        <Grid item><h3>MODIFY PRODUCT</h3></Grid>

        <Grid item>
        <TextField label="Name*" value={Name} onChange={(e)=>{setName(e.target.value)}}variant="outlined" sx={textFieldStyle}/>
        </Grid>

        <Grid item>
        <TextField label="Category*" value={Category} onChange={(e)=>{setCategory(e.target.value)}}  variant="outlined" sx={textFieldStyle}/>
        </Grid>

        <Grid item >
        <TextField label="Manufracturer*" value={Manufracturer} onChange={(e)=>{setManufracturer(e.target.value)}}variant="outlined" sx={textFieldStyle}/>
        </Grid>
      
        <Grid item >
        <TextField label="Available Item*" value={AvailableItem} onChange={(e)=>{setAvailableItem(e.target.value)}} variant="outlined" sx={textFieldStyle}/>
        </Grid>
      
        <Grid item >
        <TextField label="Price*" value={Price} onChange={(e)=>{setPrice(e.target.value)}} variant="outlined" sx={textFieldStyle}/>
        </Grid>
      

        <Grid item >
        <TextField label="Image URL" value={Image} onChange={(e)=>{setImage(e.target.value)}} variant="outlined" sx={textFieldStyle}/>
        </Grid>
      

        <Grid item >
        <TextField label="Product Description" value={ProductDescription} onChange={(e)=>{setProductDescription(e.target.value)}} variant="outlined" sx={textFieldStyle}/>
        </Grid>
        <Grid item >
        <Button variant="contained" sx={{width:"180px", padding:"5px"}} onClick={()=>{
          (async()=>{
            try{
              const response=axios('http://localhost:8080/api/products/'+id,{
                method:"PUT",
                data:{
                  "id":id,
                  "name": Name,
                  "category": Category,
                  "price": +Price,
                  "description": ProductDescription,
                  "manufacturer": Manufracturer,
                  "availableItems": +AvailableItem,
                  "imageUrl": Image
                },
                headers:{
                  "Authorization" : `Bearer ${localStorage.getItem("loggedUser")}`
              }
              })
              if((await response).status==200){
                alert("Product Modified Successfully!");
              } else{
                alert('Error something went wrong');
              }
            }catch(e){
              alert('Error something went wrong');
            }
          })();
        }}>MODIFY PRODUCT</Button>
        </Grid>
      
      </Grid>
      </Box>
  );
}