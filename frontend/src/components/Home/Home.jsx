
import { Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import User from '../User/User'
import { useSelector, useDispatch } from 'react-redux';
import Post from '../Post/Post';
import { getAllUsers, getFollowingPosts, loadUser } from '../../Actions/User';
import Loader from '../Loader';
import { Typography } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
     const {error,loading,posts}=useSelector((state)=>state.postOfFollowing)
     const {users,loading:userLoading}=useSelector((state)=>state.allUsers)
     const { error:likeError, message } = useSelector((state) => state.like);
     
    
    const dispatch=useDispatch();
    
   
    useEffect(() => {
     
     dispatch(loadUser())
     }, [dispatch])
   
    useEffect(() => {
      dispatch(getFollowingPosts())
      dispatch(getAllUsers())
     
    }, [dispatch])

    // useEffect(() => {
    //   if (message) {
    //     toast.success(message);
    //     dispatch({
    //       type:"clearMessage"
    //     })
    //   }
    //   if (likeError) {
    //     toast.error(likeError);
    //     dispatch({
    //       type:"clearErrors"
    //     })
    //   }
    // }, [dispatch,message,error]);
   
   

  return (
  
    loading===true || userLoading===true ? (<Loader />) : (
      <Box  p={1} display={'flex'}>
        <Stack sx={{
            background :"linear-gradient(to right,#fff5bc,#cec1ff)",
            height:"95vh",
            overflowY:"auto"
        }} width={'80vw'} >
       {
        posts && posts.length>0  ? (
          posts.map((post)=>(
          <Post key={post._id} postId={post._id} caption={post.caption}  postImage={post?.image?.url}  likes={post.likes} comments={post.comments} ownerImage={post?.owner?.avatar?.url} ownerName={post?.owner?.name} ownerId={post.owner?._id} />
        ))):( <Typography alignItems={'center'}>NO POST YET</Typography>)
       }

        </Stack>
        <Stack  alignItems={'center'} sx={{
         overflowY:"auto"
        }}  mt={1}  width={'20vw'}>
       

       {
        users && users.length>0 ? (
          users.map((user)=>(
            <User  key={user._id} userId={user._id} name={user.name}  />
          ))
        ):(
          <Typography variant='h6'>No User Yet</Typography>
        )
       }

        </Stack>
     </Box>
    )
  
  )
}

export default Home