import { sendEmail } from "../middleware/sendEmail.js";
import { userModel } from "../models/User.js";

import { postModel } from "./../models/Post.js";
import crypto from "crypto";
import cloudinary from "cloudinary";

export const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    
    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    user = await userModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const token = await user.getJwtToken();

    const options = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.status(201).cookie("token", token, options).send({
      success: true,
      user,
      token,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User doest not found",
      });
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await user.getJwtToken();

    const options = {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),

      httpOnly: true,
      secure: true,
      sameSite: "none",
      
    };

    res.status(200).cookie("token", token, options).send({
      success: true,
      user,
      token,
      message: "User Login Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .send({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//update password
export const updatePassword = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide your old and new password",
      });
    }
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Incorrect old passord",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).send({ success: true, message: "Password Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const followUser = async (req, res) => {
  const userToFollow = await userModel.findById(req.params.id);
  const loggedInUser = await userModel.findById(req.user._id);

  if (!userToFollow) {
    return res.status(404).send({
      success: false,
      message: "User to follow not found",
    });
  }

  if (loggedInUser.following.includes(userToFollow._id)) {
    loggedInUser.following.pull(userToFollow._id);
    userToFollow.followers.pull(loggedInUser._id);
    await loggedInUser.save();
    await userToFollow.save();
    res.status(200).send({
      success: true,
      message: "User Unfollowed",
    });
  } else {
    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await userToFollow.save();
    res.status(200).send({
      success: true,
      message: "User followed",
    });
  }
};

export const getPostsOfFollowing = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const posts = await postModel
      .find({
        owner: {
          $in: user.following,
        },
      })
      .populate("owner likes comments.user");
    if (!posts) {
      res.status(404).send({
        success: false,
        message: "No Post found",
      });
    }

    res.status(200).send({ success: true, posts: posts.reverse() });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.messsage,
    });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, avatar } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    if (avatar) {
      (user.avatar.public_id = myCloud.public_id),
        (user.avatar.url = myCloud.secure_url);
    }


    await user.save();
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMyProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const posts = user.posts;
    const followers = user.following;
    const userId = user._id;
    const following = user.following;
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await userModel.findByIdAndDelete(req.user._id);

    res.status(200).cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    for (let i = 0; i < posts.length; i++) {
      const post = await postModel.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);

      await postModel.findByIdAndDelete(post._id);
    }

    for (let i = 0; i < followers.length; i++) {
      const follower = await userModel.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }
    for (let i = 0; i < following.length; i++) {
      const follows = await userModel.findById(following[i]);
      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }

    //deletingall commments of the user from the posts

    const allPosts = await postModel.find();
    for (let i = 0; i < allPosts.length; i++) {
      const post = await postModel.findById(allPosts[i]._id);
      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }

    //deleting all likes of the user from the posts

    for (let i = 0; i < allPosts.length; i++) {
      const post = await postModel.findById(allPosts[i]._id);
      for (let j = 0; j < post.comments.length; j++) {
        if (post.likes[j].user === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }

    res.status(200).send({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("posts followers following");
    res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

//
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel
      .findById(id)
      .populate("posts followers following");
    if (!user) {
      return res.satus(400).send({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).send({ success: true, user });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    });

    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const resetPasswordToken = await user.getResetPasswordToken();

    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;
    const message = `Reset Your Password by clicking on the below link \n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      return res.status(200).send({
        success: true,
        message: `email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .toString("hex");
    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid token or expired",
      });
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await postModel
        .findById(user.posts[i])
        .populate("likes owner comments.user");
      posts.push(post);
    }

    return res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);

    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await postModel
        .findById(user.posts[i])
        .populate("likes owner comments.user");
      posts.push(post);
    }
 
    return res.status(200).send({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
