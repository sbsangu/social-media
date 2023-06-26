import { Avatar, Box, Button, Dialog, Input, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, likePost } from "../../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "./../../Actions/User";
import User from "../User/User";
import CommentCard from "../CommentCard";
import { updateCaption } from './../../Actions/Post';

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeUser, setLikeUser] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [commentToggle,setCommentToggle]=useState(false)
  const [commentValue,setCommentValue]=useState('')

  const [captionToggle,setCaptionToggle]=useState(false)
  const [captionValue,setCaptionValue]=useState(caption)

  const dispatch = useDispatch();

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
     dispatch(getMyPosts())
    } else {
      dispatch(getFollowingPosts());
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  const addCommentHandler=async(e)=>{
    e.preventDefault();
    await dispatch(addCommentOnPost(postId,commentValue))
    setCommentToggle(!commentToggle)
    setCommentValue('')

    if (isAccount) {
      dispatch(getMyPosts())
    } else {
      dispatch(getFollowingPosts());
    }
  }

  const updateCaptionHandler=async(e)=>{
    e.preventDefault();
     await dispatch(updateCaption(captionValue,postId))
    dispatch(getMyPosts())
  }

  const deleteButtonHandler=async()=>{
   await  dispatch(deletePost(postId))
   dispatch(getMyPosts())
    

  }
  // useEffect(() => {
   
   
  // }, [])
  


  return (
    <>
      <Box
        p={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Stack
          sx={{
            backgroundColor: "white",
            padding: 4,
            width: "60%",
          }}
        >
          <Box mb={1} marginRight={"-20px"} alignSelf={"end"}>
            {isAccount ? (
              <Button onClick={()=>setCaptionToggle(!captionToggle)}>
                <MoreVert />{" "}
              </Button>
            ) : null}
          </Box>
          <img
            src={postImage}
            alt={"Post"}
            style={{objectFit:"contain",alignSelf:"center",
              height: "70vh",
              width: "100%",
            }}
          />
          <Box p={1} mt={1} display={"flex"} gap={2} alignItems={"center"}>
            <Avatar
              src={ownerImage}
              alt="User"
              sx={{
                height: "2.5vmax",
                width: "2.5vmax",
              }}
            />
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontFamily: "fantasy",
              }}
              to={`/user/${ownerId}`}
            >
              <Typography> {ownerName} </Typography>
            </Link>
            <Typography
              sx={{ color: "black", opacity: "0.5", alignSelf: "center" }}
            >
              {caption}{" "}
            </Typography>
          </Box>
          <Button
            p={1}
            width={"fit"}
            sx={{
              alignSelf: "start",
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setLikeUser(!likeUser)}
          >
            <Typography>{likes.length} likes</Typography>
          </Button>
          <Box>
            <Button
              onClick={handleLike}
              sx={{
                color: "black",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
            >
              {liked ? (
                <Favorite style={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )}
            </Button>

            <Button
              sx={{
                color: "black",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }}
              onClick={()=>setCommentToggle(!commentToggle)}
            >
             
              <ChatBubbleOutline />
            </Button>
            <Button
              sx={{
                color: "black",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                },
              }} onClick={deleteButtonHandler}
            >
              {isDelete ? <DeleteOutline /> : null}
            </Button>
          </Box>
        </Stack>
        <Box></Box>
      </Box>
      <Dialog sx={{overflowY:"auto"}} open={likeUser} onClose={() => setLikeUser(!likeUser)}>
        <Typography p={1} alignSelf={'center'} variant="h5" width={"20vw"} marginBottom={1} >
          {" "}
          Liked By
        </Typography>
       <Box display={'flex'} flexDirection={"column"} justifyContent={"start"} alignItems={"center"}>
       {likes.map((like) => (
          <User
            key={like._id}
            name={like.name}
            userId={like._id}
            avatar={like.avatar.url}
          />
        ))}

       </Box>
      </Dialog>
      <Box height={"80vh"} color="white">
      <Dialog sx={{overflowY:"auto", overflowX:"hidden" ,padding:"30px",height:"100%"}} open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
        <Typography sx={{alignSelf:"cenetr"}} p={4} alignSelf={'center'} variant="h5" width={"30vw"} marginBottom={1} >
          {" "}
          Comments 
        </Typography>
        <form  style={{
          padding:4,
          marginX:"30px"

        }} onSubmit={addCommentHandler}>
          <Box display={'flex'} flexDirection={"column"} gap={2}> 
          <Input type="text" placeholder="Comment here..." value={commentValue} onChange={(e)=>setCommentValue(e.target.value)} />

<Button sx={{width:"50%" ,alignSelf:"center" ,margin:2}} type="submit" variant="contained">Add Comment</Button>
          </Box>
        </form>
       <Box display={'flex'} width={"100%"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"}>
      

      {comments.length>0 ? comments.map((comment)=>(
        <CommentCard key={comment._id} userId={comment.user._id} name={comment.user.name} avatar={comment.user.avatar.url} comment={comment.comment} commentId={comment._id} postId={postId} isAccount={isAccount} />
      )) :
      <Typography>No Comment Yet </Typography> }
       </Box>
      </Dialog>

      <Dialog sx={{overflowY:"auto", overflowX:"hidden" ,padding:"30px",height:"100%"}} open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
        <Typography sx={{alignSelf:"cenetr"}} p={4} alignSelf={'center'} variant="h5" width={"30vw"} marginBottom={1} >
          {" "}
          Caption
        </Typography>
        <form  style={{
          padding:4,
          marginX:"30px"

        }} onSubmit={updateCaptionHandler}>
          <Box display={'flex'} flexDirection={"column"} gap={2}> 
          <Input type="text" placeholder="Caption here..." value={captionValue} onChange={(e)=>setCaptionValue(e.target.value)} />

<Button sx={{width:"50%" ,alignSelf:"center" ,margin:2}} type="submit" variant="contained">Update Caption</Button>
          </Box>
        </form>
       <Box display={'flex'} width={"100%"} flexDirection={"column"} justifyContent={"start"} alignItems={"center"}>
      

      {comments.length>0 ? comments.map((comment)=>(
        <CommentCard key={comment._id} userId={comment.user._id} name={comment.user.name} avatar={comment.user.avatar.url} comment={comment.comment} commentId={comment._id} postId={postId} isAccount={isAccount} />
      )) :
      <Typography>No Comment Yet </Typography> }
       </Box>
      </Dialog>
      </Box>
    </>
  );
};

export default Post;
