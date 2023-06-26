import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  likeAndUnlikePost,
  updateCaption,
} from "./../controller/post.js";
const router = express.Router();

router.post("/post/upload", isAuthenticated, createPost);

//likeandunlikepost
router.get("/post/:id", isAuthenticated, likeAndUnlikePost);

//deleting post
router.delete("/post/:id", isAuthenticated, deletePost);

//updating caption
router.put("/post/:id", isAuthenticated, updateCaption);

//commenting on post
router.put("/post/comment/:id", isAuthenticated, commentOnPost);

//deleting comment on post
router.delete("/post/comment/:id", isAuthenticated, deleteComment);

export default router;
