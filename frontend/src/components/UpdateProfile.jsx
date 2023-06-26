import React, { useEffect, useState } from "react";
import { Avatar, Box, Input, Button, Typography } from "@mui/material";

import {toast} from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, loadUser, userPosts, userProfile} from "../Actions/User";

import { useNavigate } from "react-router-dom";
import { updateProfile } from "../Actions/Post";
import Loader from "./Loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user,isAuthenticated } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);
   
  useEffect(() => {
    
    dispatch(getMyPosts());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
 
  const [name, setName] = useState('');

  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPrev, setAvatarPrev] = useState("");

  
 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPrev(reader.result);
      }
    };
  };



  const submitHandler = async (e) => {
    e.preventDefault();

    await dispatch(updateProfile(name, email, avatar));
    navigate("/account");
    dispatch(loadUser());
  };

  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (updateError) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (message) {
        
        dispatch({ type: "clearMessage" });
      }
    }, [error, updateError,message]);

  return loading===true  || updateLoading===true ? (
    <Loader />
  ) : (
    <Box
      p={3}
      mt={2}
      sx={{
        background: "linear-gradient(to right,#fff5bc,#cec1ff)",
        height: "100vh",
      }}
    >
     {isAuthenticated ? (<> <Box>
        <Typography variant="h3" p={1} textAlign={"center"}>
          Social Apz
        </Typography>
        <form onSubmit={submitHandler}>
          <Box
            mx={"auto"}
            bgcolor={"white"}
            p={2}
            borderRadius={"30px"}
            width={["80%", "50%"]}
            alignContent={"center"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={4}
          >
            <Avatar
              src={avatarPrev}
              alt="avatar"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
            <Input
              onChange={handleImageChange}
              disableUnderline
              sx={{
                border: "2px solid grey",
                p: 1,
                borderRadius: "50px",
                height: "40%",
              }}
              type="file"
              accept="image/*"
            />

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disableUnderline
              sx={{
                border: "2px solid grey",
                p: 1,
                borderRadius: "50px",
                height: "40%",
                pl: "40px",
              }}
              type="text"
              placeholder="Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disableUnderline
              sx={{
                border: "2px solid grey",
                p: 1,
                borderRadius: "50px",
                height: "40%",
                pl: "40px",
              }}
              type="email"
              placeholder="Email"
            />
            {/* <Input  value={password} onChange={(e)=>setPassword(e.target.value)} disableUnderline sx={{border:"2px solid grey",p:1 ,borderRadius:"50px" ,height:"40%" ,pl:"40px"}} type='password' placeholder='Password' /> */}

            <Button
              disabled={updateLoading}
              type="submit"
              variant={"contained"}
            >
              Update
            </Button>
          </Box>
        </form>
      </Box></>) :(null)}
    </Box>
  );
};

export default UpdateProfile;
