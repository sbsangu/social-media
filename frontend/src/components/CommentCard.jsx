import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { deleteComment } from '../Actions/Post.js';
import { useDispatch } from 'react-redux';
import { getFollowingPosts, getMyPosts } from './../Actions/User';


const CommentCard = ({userId,name,avatar,comment,commentId,postId,isAccount}) => {
    const  {user}=useSelector((state)=>state.user)
    const dispatch=useDispatch()
   
    const {message}=useSelector((state)=>state.like)
    const {posts}=useSelector((state=>state.postOfFollowing))
    

    const deleteButtonHandler=async()=>{
        await dispatch(deleteComment(postId,commentId))
        dispatch(getMyPosts())
        

    }
    useEffect(() => {
   
    
      dispatch(getFollowingPosts())
      

     
  
     
    }, [dispatch])
    

    

  return (
    <Box display={'flex'} flexDirection={"row"} justifyContent={'space-evenly'} p={3} gap={6} alignItems={"center"}>
    <Link style={{textDecoration:"none",color:"black" }} to={`/user/${userId}`}>
       <Box display={'flex'} flexDirection={"row"} justifyContent={'space-between'} alignItems={"center"} gap={2}>
       
        <Avatar  src={avatar} alt={name}  />
        <Typography>{name}</Typography>

        
       </Box>
       </Link>
        <Typography> {comment} </Typography>

       {isAccount?  (<Button onClick={deleteButtonHandler}>
            <Delete/>
        </Button>) : userId===user._id ? ( <Button onClick={deleteButtonHandler}>
            <Delete/>
        </Button>) : null
        }
    </Box>
  )
}

export default CommentCard