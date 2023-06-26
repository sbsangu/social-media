import { Box, Button, Input, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import {useDispatch} from 'react-redux'
import { updatePassword } from "../Actions/Post";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";


const UpdatePassword= () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const {loading,error,message}=useSelector((state)=>state.like)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    dispatch(updatePassword(oldPassword,newpassword))
    toast.success("Password Updated")
   navigate("/account")
 
    
  };
 
  

  return (
   loading? <Loader/>:(
    <Box>
    <form onSubmit={submitHandler}>
      <Box
        pt={4}
        height={"80vh"}
        mx={"auto"}
        maxWidth={"lg"}
        sx={{ background: "linear-gradient(to right,#fffbc5,#cec1fc)" }}
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
          type="password"
          placeholder="Old Password"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          required
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

       
        <Button
          type="submit"
          variant="containe"
          sx={{ color: "black", backgroundColor: "lightgray" }}
        >
          Update Password
        </Button>
        
      </Box>
    </form>
  </Box>
   )
  );
};

export default UpdatePassword;
