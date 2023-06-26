import React, { useEffect, useState } from "react";

import { Avatar, Box, Button, Dialog, Stack, Typography } from "@mui/material";
import axios from "axios";


import { useSelector, useDispatch } from "react-redux";
import { followAndUnfollowUser, loadUser, userPosts, userProfile } from "./../Actions/User.js";
import Loader from "./Loader";
import Post from "./Post/Post";
import { useParams } from "react-router-dom";

import User from "./User/User";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  
  const { user: me,isAuthenticated } = useSelector((state) => state?.user);
  const { loading, posts} = useSelector((state) => state?.userPosts);
  const {message:likeMessage,error:deleteError}=useSelector((state)=>state.like)
  const { user, loading: userLoading } = useSelector(
    (state) => state?.userProfile
  );
  

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);




 useEffect(() => {
  dispatch(loadUser())
 }, [dispatch])
 



  

  const handleFollow = (e) => {
    e.preventDefault();
    setFollowing(!following);
   dispatch(followAndUnfollowUser(params.id))

  };


  
 
  useEffect(() => {
    dispatch(userPosts(params?.id));
    dispatch(userProfile(params?.id));

    

  }, [dispatch,params.id,likeMessage]);



  

  useEffect(() => {
    if (me?._id === params?.id) {
      setMyProfile(true);
    }
    if (user) {
      user?.followers?.forEach((item) => {
        if (item?._id === me?._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user,me._id,params.id]);

  // useEffect(() => {
   
  //   if (likeMessage) {
  //     toast?.success(likeMessage);
    
  //   }
  //   dispatch({ type: "clearMessage" });
   

  //   if (deleteError) {
  //     toast.error(deleteError);
    
  //   }
  //   dispatch({ type: "clearErrors" });
  // }, [likeMessage,deleteError]);
 

  return  (
    loading===true || userLoading===true ? <Loader/>:
    (
    
    <Box p={1} display={"flex"}>
      {isAuthenticated && user  ? (<><Stack
        sx={{
          background: "linear-gradient(to right,#fff5bc,#cec1ff)",
          height: "95vh",
          overflowY: "auto",
        }}
        width={"80vw"}
      >
             {posts && posts?.length > 0 ?
              (
          posts?.map((post) => (
            <Post
              key={post?._id}
              postId={post?._id}
              caption={post?.caption}
              postImage={post?.image?.url}
              likes={post?.likes}
              comments={post?.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post?.owner?.name}
              ownerId={post?.owner?._id}
            />
          ))
        )
       
         : (
          <Typography variant="h6">User has not made any post</Typography>
        )}
      </Stack>
      
      <Stack
        alignItems={"center"}
        sx={{
          overflowY: "auto",
        }}
        mt={1}
        p={2}
        width={"20vw"}
      >
       { user && <> <Avatar
          sx={{
            transition: "all 0?.5s",
            "&:hover": {
              transform: "scale(1?.1)",
            },
            height: "8vmax",
            width: "8vmax",
          }}
          src={user?.avatar?.url}
          alt={user?.name}
        />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography mt={1} mb={1}>
            {user?.name}
          </Typography>
          <button onClick={() => setFollowerToggle(!followerToggle)}>
            Followers
          </button>
          <Typography p={2}>{user?.followers?.length} </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            Following
          </button>
          <Typography p={2}>{ user && user?.following?.length} </Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          Posts
          <Typography p={2}>{user?.posts?.length} </Typography>
        </Box>
        {myProfile ? null : (
          <Button onClick={handleFollow} variant="contained">
            {following ? "unfollow" : "follow"}
          </Button>
          
        )}
        </> }
      </Stack> </>) :(
        <Typography>Please Login First</Typography>
      )}
      
      <Dialog
        open={followerToggle}
        onClose={() => setFollowerToggle(!followerToggle)}
      >
        <Box height={"60vh"} width={"30vw"}>
          <Typography p={2} alignSelf={"center"} textAlign={"center"}>
            Followers
          </Typography>
          {user ? (
            user?.followers?.map((follower) => (
              <User
                key={follower?._id}
                avatar={follower?.avatar?.url}
                name={follower?.name}
                userId={follower?._id}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>You Have No Followers </Typography>
          )}
        </Box>
      </Dialog>
      <Dialog
        open={followingToggle}
        onClose={() => setFollowingToggle(!followingToggle)}
      >
        <Box height={"60vh"} width={"30vw"}>
          <Typography p={2} alignSelf={"center"} textAlign={"center"}>
            Followers
          </Typography>
          {user ? (
            user?.following?.map((follow) => (
              <User
                key={follow?._id}
                userId={follow?._id}
                name={follow?.name}
                avatar={follow?.avatar?.url}
              />
            ))
          ) : (
            <Typography>You Have 0 Following </Typography>
          )}
        </Box>
      </Dialog>
    </Box>)
  );
};

export default UserProfile;
