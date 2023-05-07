import Home from "./components/home/Home"
import './App.css';
import Navbar from './components/navbar/Navbar'
import { useEffect, useState } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Modify from "./components/AddEdit/Modify";
import Add from "./components/AddEdit/Add";
import Details from "./components/product/details";
import Confirm from "./components/product/Confirm";
import Address from "./components/product/address";
import Order from "./components/product/order";

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("loggedUser"));
  const [isAdmin,setIsAdmin]=useState(false);
  return (
    <div className="App" style={{width:"100%", overflow:"hidden"}}>
    
    <BrowserRouter >
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin}/>
    <Routes>
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin=
      {setIsAdmin}/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/edit/:id" element={<Modify />}/>
      <Route path="/details/:id" element={<Details />}/>
      <Route path="/confirm/:id/:quantity" element={<Confirm />} />
      <Route path="/address/:id/:quantity" element={<Address />} />
      <Route path="/order/:id/:quantity" element={<Order />} />
      <Route path="/Add" element={<Add/>}/>
      <Route path="/home" element={<Home isAdmin={isAdmin}/>}/>
      <Route path="/" element={isLoggedIn?<Home />:<Login setIsLoggedIn={setIsLoggedIn}/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
