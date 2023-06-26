import React, { useState } from 'react'


import {Input, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Actions/User';
import User from './User/User';
const Search = () => {
    const [name,setName]=useState('')
    const dispatch=useDispatch()
    const {users,loading:usersLoading}=useSelector((state)=>state.allUsers)

    const submitHandler=async(e)=>{
        e.preventDefault();
      
        await dispatch(getAllUsers(name))

        setName("")
      
        
    }
    console.log(users)

  return (
    <Box  p={3} alignItems={'center'}
    mt={2}
    sx={{
      background: "linear-gradient(to right,#fff5bc,#cec1ff)",
      height: "100vh",
    }}>
    <Typography variant="h3" p={1} textAlign={"center"}>
      Social Apz
    </Typography>
    <form onSubmit={submitHandler}>
      <Box
        mx={"auto"}
        bgcolor={"white"}
        p={8}
        borderRadius={"30px"}
        width={["80%", "50%"]}
        alignContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={4}
      >
       

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
       
        {/* <Input  value={password} onChange={(e)=>setPassword(e.target.value)} disableUnderline sx={{border:"2px solid grey",p:1 ,borderRadius:"50px" ,height:"40%" ,pl:"40px"}} type='password' placeholder='Password' /> */}

        <Button disabled={usersLoading}
        
          type="submit"
          variant={"ghost"}
          color='blue'
        >
          Search
        </Button>

        { users &&  users.length>0 && users.map((user)=>(
  <User key={user._id}  userId={user._id} name={user.name} avatar={user.avatar} />
))}
      </Box>
    </form>

  </Box>
  )
}

export default Search