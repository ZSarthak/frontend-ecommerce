import  "./Home.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
import Product from "../product/product";
import {Box,Select,MenuItem} from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
const Home=({isAdmin})=>{
    const [products,setProducts]=useState([])
    const [defaultProducts,setDefaultProducts]=useState([]);
    const sortItems=(choice)=>{
        switch(choice){
            case "0":
                setProducts(defaultProducts);
                break;
            case "1":
                setProducts(defaultProducts.sort((a,b)=>{
                    return 1
                }))
                break;
            case "2":
                setProducts(defaultProducts.sort((a,b)=>{
                    return -1
                }))
                break;
            case "3":
                break;
            default:
                setProducts(defaultProducts);
        }
    }
    useEffect(()=>{
        axios('http://localhost:8080/api/products',{
            method:"GET",
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("loggedUser")}`
            }
        }).then((response)=>{
            setProducts(response.data);
            setDefaultProducts(response.data);
            console.log(response.data);
        }).catch(e=>{
            console.log(e)
        })
    },[])
    if(!localStorage.getItem("loggedUser"))
   {
    return(<>
    Please Login to view this page
    </>)
   }
    else
return(
    <div>
        <ToggleButton value="All">ALL</ToggleButton>
      <ToggleButton value="Apparel">APPAREL</ToggleButton>
      <ToggleButton value="Electronics">ELECTRONICS</ToggleButton>
      <ToggleButton value="Personalcare">PERSONAL CARE</ToggleButton>
      <br></br>
      <Box>
        Sort by:{"  "}
        <Select sx={{width:"200px"}} onChange={(e)=>sortItems(e.target.value)}>
            <MenuItem value="0">Default</MenuItem>
            <MenuItem value="1">Price:High to Low</MenuItem>
            <MenuItem value="2">Price:Low to High</MenuItem>
            <MenuItem value="3">Newest</MenuItem>
        </Select>
      </Box>
        <Grid container direction={"row"} justifyContent="space-between" sx={{margin:"10px", padding:"24px"}}>
        {
            products.map((product)=>(
            <Grid item lg={2.8} md={2.8} sm={2.8}>
                <Product name={product.name} 
                description={product.description} 
                isAdmin={(isAdmin==true||localStorage.getItem("isAdmin")==true)}    
                id={product.id}        
                price={product.price}    
                imageUrl={product.imageUrl}/>
                
            </Grid>
            
            ))
        }
         </Grid>
        
    </div>
) 
}

export default Home;