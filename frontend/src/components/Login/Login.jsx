import { Box, Button, Input, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from "../../Actions/User.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch()
  const  navigate=useNavigate()
  const {isAuthenticated,message,error} = useSelector((state)=>state.user)

  const submitHandler = (e) => {
    e.preventDefault();
   
    dispatch(loginUser(email,password))
  
  };
 
  useEffect(() => {
    
  
    if(isAuthenticated){
      
      
     
      navigate("/")
    }
    
    if(!isAuthenticated){
      toast.error(error)
      dispatch({type:"clearErrors"})
    }
    
  }, [dispatch,message,error,isAuthenticated])
  

  return (
    <Box>
      <form onSubmit={submitHandler}>
        <Box
          pt={4}
          height={"80vh"}
          mx={"auto"}
          maxWidth={"lg"}
          sx={{ backgroundColor: "beige" }}
          mt={2}
          display={"flex"}
          justifyContent={"center"}
          gap={6}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography variant="h3" fontFamily={"fantasy"}>
            Social Apz
          </Typography>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            style={{
              outline: "none",
              fontFamily: "roboto",
              marginLeft: "-5rem",
              color: "darkviolet",
              textDecoration: "none",
            }}
            to="/forgot/password"
          >
            Forgot Password
          </Link>
          <Button
            type="submit"
            variant="containe"
            sx={{ color: "black", backgroundColor: "lightgray" }}
          >
            Login
          </Button>
          <Link
            style={{
              outline: "none",
              fontFamily: "roboto",
              marginRight: "-6rem",
              color: "black",
              textDecoration: "none",
            }}
            to="/register"
          >
            New User?
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
