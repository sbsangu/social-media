import { Box, Button, Input, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useState } from "react";
import { forgotPassword } from "../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const dispatch=useDispatch()
    // const navigate=useNavigate()
    const {loading,error,message}=useSelector((state)=>state.like)
  const [email, setEmail] = useState("");
  console.log(message,error)
 const submitHandler=async(e)=>{
  
    
    e.preventDefault()
    
    await dispatch(forgotPassword(email))
  

 }

 useEffect(() => {

      if(message){
   toast.success(message);
    dispatch({type:"clearMessage"})
    
    
}
if(error){
   toast.error(error)
    dispatch({type:"clearErrors"})
}
  
 }, [message,error])
 
  

  return (
    <Box >
      <form onSubmit={submitHandler}>
        <Box
          pt={4}
          height={"100vh"}
          mx={"auto"}
          my={'auto'}
          maxWidth={"lg"}
          sx={{backgroundColor:"beige"}}
          
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
         <Button disabled={loading} variant="contained" type="submit">Send Token</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPassword