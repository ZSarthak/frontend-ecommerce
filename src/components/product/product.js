import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Button, Icon,Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleButton from '@mui/material/ToggleButton';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Product=({name,description,imageUrl,id,price})=>{
    const navigate=useNavigate()
const [open,setOpen]=React.useState(false);
const handleClose=()=>setOpen(false);
const isAdmin=(localStorage.getItem("isAdmin"));
const style = {
  position: 'absolute',
  backgroundColor:"white",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
return(
    <div>

    
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box  style={style}>
   <Box>Are you sure you want to delte the product?</Box>
   <br></br>
   <Box>confirm deletion of product</Box>
   <br></br>
   <Box sx={{float:"right"}}>
    <Button variant="contained" onClick={handleClose}>Cancel</Button>
    <Button variant="contained" onClick={()=>{
      (async()=>{
        try{
          const response=axios('http://localhost:8080/api/products/'+id,{
            method:"DELETE",
            headers:{
              "Authorization" : `Bearer ${localStorage.getItem("loggedUser")}`
          }
          })
          if((await response).status==204){
            alert("Product Deleted Successfully!");
            window.location.reload();
          } else{
            alert('Error something went wrong');
          }
        }catch(e){
          alert('Error something went wrong');
        }
      })();
    }}>Delete</Button>
   </Box>
  </Box>
</Modal>
  <Card sx={{height:"500px", padding:"10px", marginTop:"10px" }}>
      <CardActionArea>
        <CardMedia
          height="140"
          category="FOOTWEAR"
          price= "300"
          />
          <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          
          <Box> 
            <img src={imageUrl} style={{height:"250px",width:"250px"}}/>
          </Box>
          <Box sx={{height:"130px", overflowY:"auto"}}>
          <Typography gutterBottom variant="h5" component="div">
          &#8377; {price}
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            {description}
          </Typography>
          </Box>
          
        </CardContent>
          </CardActionArea>
          <Box sx={{margin:"10px 0px"}}>
          <Button
          onClick= {()=>navigate(`/details/${id}`)}
  variant="contained" sx={{ width: '30px', float:'left',
                backgroundColor: "#2A25BE",
                '&:hover': {
                  backgroundColor: "#D54035BF",
                },
              }}>BUY</Button>
            {(isAdmin=="true")&&<Box sx= {{float:"right"}}>
              <Icon onClick= {()=>navigate(`/edit/${id}`)} sx= {{marginRight:"10px", cursor:"pointer", marginTop:"8px",position:"relative",zIndex:10}}>
                <EditIcon/>
              </Icon>

              <Icon sx={{cursor:"pointer", marginTop:"8px"}} onClick={()=>setOpen(true)}>
                <DeleteIcon/>
              </Icon>
              </Box>}
          </Box>
          </Card>


    </div>
) 
}

export default Product;