import express from "express";
import {
  deleteMyProfile,
  followUser,
  forgotPassword,
  getAllUsers,
  getPostsOfFollowing,
  getUserProfile,
  getMyPosts,
  login,
  logout,
  myProfile,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
  getUserPosts,
} from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

//update password
router.put("/update/password", isAuthenticated, updatePassword);

//update profile
router.put("/update/profile", isAuthenticated, updateProfile);

router.get("/follow/:id", isAuthenticated, followUser);

router.get("/posts", isAuthenticated, getPostsOfFollowing);

router.delete("/delete/me", isAuthenticated, deleteMyProfile);

router.get("/me", isAuthenticated, myProfile);

router.get("/user/:id", getUserProfile);
router.get("/users", isAuthenticated, getAllUsers);

router.post("/forgot/password", forgotPassword);

router.put("/password/reset/:token", resetPassword);

router.get("/my/posts", isAuthenticated, getMyPosts);

router.get("/userposts/:id", getUserPosts);

export default router;
