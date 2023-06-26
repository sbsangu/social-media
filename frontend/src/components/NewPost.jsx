import React from 'react'
import {  Box, Button, Input, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNeWPost } from '../Actions/Post';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const [image,setImage]=useState(null)
    const [caption,setCaption]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {loading,error,message}=useSelector((state)=>state.like)

    const changeImageHandler=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        await dispatch(createNeWPost(caption,image))
        setImage('')
        setCaption('')
       
    }
    // useEffect(() => {

    //     if(error){
    //         toast.error(error)
    //     }
    //     dispatch({
    //         type:"clearErrors"
    //     })
    //     if(message){
    //         toast.success(message)
           
    //     }
    //     dispatch({
    //         type:"clearMessage"
    //     })
    
      
    // }, [dispatch])
    

  return (
    <Box mt={2} sx={{
        backgroundImage:"linear-gradient(to right,#fff5bc,#cec1ff)"
    }}> 
        <form onSubmit={submitHandler} style={{ height:'85vh'}}>
        <Box  p={8} display={'flex'}   flexDirection={"column"} justifyContent={'center'}  gap={4} alignItems={'center'}  > 
        <Typography textAlign={'center'} mt={2} variant='h3'>New Post</Typography>

{image ? <img  style={{
    width:"12vmax",height:"12vmax",objectFit:"cover"
}} src={image} alt="post" /> : null}

<Input sx={{
    borderRadius:"40px", margin:"1vmax", width:"20%",
    "::webkit-file-upload-button":{
        backgroundColor:"blue",
        color:"white",
       
        
    }
}} type='file' accept="image/*" onChange={changeImageHandler} />
<Input   type="text" placeholder='Caption' value={caption} onChange={(e)=>setCaption(e.target.value)} />

<Button disabled={loading} variant='contained' type="submit" >Post</Button></Box>
       
        </form>
    </Box>
  )
}

export default NewPost