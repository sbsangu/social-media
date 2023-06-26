import React, { useDebugValue, useEffect, useState } from "react";

import { Avatar, Box, Button, Dialog, Stack, Typography } from "@mui/material";

import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteMyProfile,
  getMyPosts,
  loadUser,
  logoutUser,
} from "./../Actions/User";
import Loader from "./Loader";
import Post from "./Post/Post";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import User from "./User/User";

const Account = () => {
  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    error: userError,
    message,
  } = useSelector((state) => state.user);
  const { error, loading, posts } = useSelector((state) => state.myPosts);
  const {
    error: deleteError,
    loading: deleteLoading,
    message: likeMessage,
  } = useSelector((state) => state.like);

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    if(dispatch({type:"LogoutUserSuccess"})){
      navigate("/login")

    }
  };
  

  const deleteButtonHandler = async () => {
    await dispatch(deleteMyProfile());
   if(dispatch({type:"deleteProfileSuccess"}))
    navigate("/register")

 
  };

  useEffect(() => {
    
    dispatch(getMyPosts());
  }, [dispatch]);
  
 useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])
  
  

  // useEffect(() => {
    
  
  //   if(likeMessage){
  //     toast.success(likeMessage)
  //     dispatch({type:"clearMessage"})
  //   }

  //   if(deleteError){
  //     toast.error(error)
  //     dispatch({type:"clearErrors"})
  //   }
  // }, [dispatch,likeMessage,deleteError])
  

  

  return loading ===true ||deleteLoading===true ? (
    <Loader />
  ) : (
    <Box p={1} display={"flex"}>
     {isAuthenticated? (<> <Stack
        sx={{
          background: "linear-gradient(to right,#fff5bc,#cec1ff)",
          height: "95vh",
          overflowY: "auto",
        }}
        width={"80vw"}
      >
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post?.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post?.owner?.avatar?.url}
              ownerName={post?.owner?.name}
              ownerId={post.owner?._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography alignSelf={"center"}>NO POST YET</Typography>
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
        <Avatar
          sx={{
            transition: "all 0.5s",
            "&:hover": {
              transform: "scale(1.1)",
            },
            height: "8vmax",
            width: "8vmax",
          }}
          src={user.avatar.url}
          alt={user.name}
        />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography mt={1} mb={1}>
            {user.name}
          </Typography>
          <button onClick={() => setFollowerToggle(!followerToggle)}>
            Followers
          </button>
          <Typography p={2}>{user.followers.length} </Typography>
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <button onClick={() => setFollowingToggle(!followingToggle)}>
            Following
          </button>
          <Typography p={2}>{user.following.length} </Typography>
        </Box>

        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          Posts
          <Typography p={2}>{user.posts.length} </Typography>
        </Box>
        <Button variant={"contained"} onClick={logoutHandler}>
          Logout
        </Button>
        <Link
          style={{ color: "gray", textDecoration: "none", marginTop: "30px" }}
          to={"/update/profile"}
        >
          Update Profile
        </Link>
        <Link
          style={{ color: "gray", textDecoration: "none", margin: "20px" }}
          to={"/update/password"}
        >
          Change Password
        </Link>
        <Button
          onClick={deleteButtonHandler}
          sx={{ color: "red" }}
          variant="text"
          disabled={deleteLoading}
        >
          Delete Profile
        </Button>
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
          {user && user.followers.length > 0 ? (
            user.followers.map((follower) => (
              <User
                key={follower._id}
                avatar={follower?.avatar?.url}
                name={follower.name}
                userId={follower._id}
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
          {user && user.following.length > 0 ? (
            user.following.map((follow) => (
              <User
                key={follow._id}
                userId={follow._id}
                name={follow.name}
                avatar={follow?.avatar?.url}
              />
            ))
          ) : (
            <Typography>You Have 0 Following </Typography>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default Account;
