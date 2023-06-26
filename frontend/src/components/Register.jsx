import React, { useState,useEffect } from 'react'
import { Avatar, Box, Input, Button, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, registerUser } from '../Actions/User';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Register = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {message:registeredMessage}=useSelector((state)=>state.like)
    const {loading,error}=useSelector((state)=>state.user)
    const [name,setName]=useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [avatar,setAvatar]=useState('')
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(file)
    }

    const submitHandler = async(e)=>{
        e.preventDefault();


       await  dispatch(registerUser( name, email, password ,avatar))
      if(dispatch({type:"RegisterSuccess"})){
        navigate("/")
      }
       


    }
    useEffect(() => {
     
      dispatch(loadUser())
    }, [dispatch])
    


    // useEffect(() => {
    //     if(registeredMessage){
    //         toast.success(registeredMessage)
    //         dispatch({type:"clearMessage"})
    //     }
       
     
    // }, [dispatch,toast,registeredMessage])
    
  return (
    loading===true? <Loader /> :
   (<Box p={3} mt={2} sx={{
    background: "linear-gradient(to right,#fff5bc,#cec1ff)",
    height:"100vh",
   
   }} 
   > 
 
   <Box>
 
   <Typography variant='h3' p={1} textAlign={'center'}>Social Apz</Typography>
   <form onSubmit={submitHandler}>
   <Box mx={'auto'} bgcolor={'white'} p={2} borderRadius={"30px"} width={["80%","50%"]} alignContent={"center"} display={"flex"} flexDirection={"column"} alignItems={"center"} gap={4}>

   <Avatar src={avatar} alt="avatar"  sx={{height:"10vmax",width:"10vmax"}}/>
    <Input onChange={handleImageChange} disableUnderline sx={{border:"2px solid grey",p:1 ,borderRadius:"50px" ,height:"40%"}} type='file' accept='image/*' />

    <Input value={name} onChange={(e)=>setName(e.target.value)} disableUnderline sx={{border:"2px solid grey",p:1 ,borderRadius:"50px" ,height:"40%" ,pl:"40px"}} type="text" placeholder='Name'  />
    <Input value={email} onChange={(e)=>setEmail(e.target.value)} disableUnderline sx={{border:"2px solid grey",p:1 ,borderRadius:"50px" ,height:"40%" ,pl:"40px"}} type='email' placeholder='Email' />
    <Input  value={password} onChange={(e)=>setPassword(e.target.value)} disableUnderline sx={{border:"2px solid grey",p:1 ,borderRadius:"50px" ,height:"40%" ,pl:"40px"}} type='password' placeholder='Password' />

    <Link style={{textDecoration:"none",color:"gray"}} to={"/login"}>
  <Typography textAlign={'end'}>  Already Signed Up? Login</Typography>
   </Link>
    <Button disabled={loading} type="submit" variant={"contained"}>Register</Button>
   </Box>
  

   </form>

   
   </Box>


   </Box>)
  )
}

export default Register