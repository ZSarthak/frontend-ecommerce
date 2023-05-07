import  "./Navbar.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";
const Navbar=({isLoggedIn, setIsLoggedIn})=>{
  const navigate=useNavigate();
  const isAdmin=localStorage.getItem("isAdmin")
return(
    <AppBar position="static" sx={{width:"100%"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, pointerEvents:"none" }}
          >
            <ShoppingCart />
          </IconButton>
          <div  style={{flexGrow:1, textAlign:"left"}}>upGrad E-Shop</div>
          {!isLoggedIn?<div style={{float:"right", display:"flex", justifyContent:"space-around", padding:"10px"}}>
              <a onClick={()=>navigate("/login")} style={{textDecoration:"underline", marginRight:"10px"}}>Log in</a>
              <a onClick={()=>navigate("/signup")}style={{textDecoration:"underline"}}>Sign up</a>
          </div>:
          <div style={{float:"right", display:"flex", justifyContent:"space-around", padding:"10px", alignContent:"center"}}>
              
                <a onClick={()=>navigate("/home")} style={{textDecoration:"underline", marginRight:"10px", alignSelf:"center"}}>Home</a>
                {
                (isAdmin=="true")&&<a onClick={()=>navigate("/add")} style={{textDecoration:"underline", marginRight:"10px", alignSelf:"center"}}>Add Product</a>}
              <Button variant="contained"
              onClick={()=>{
                setIsLoggedIn(false);
                localStorage.removeItem("loggedUser");
                navigate("/login")
              }}
               sx={{
                backgroundColor: "#3f51b5",
                '&:hover': {
                  backgroundColor: "#3f51b5",
                },
              }}>LOGOUT</Button>
          </div>}
        </Toolbar>
      </AppBar>
)
}

export default Navbar;