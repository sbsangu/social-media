import { userModel } from "../models/User.js";
import  jwt from 'jsonwebtoken';


export const isAuthenticated=async(req,res,next)=>{
    try {

    const {token}=req.cookies;
    if(!token){
        return res.status(401).send({
            success:false,
            message:"Please login first"
        })
    }

    const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await userModel.findById(decoded._id);
    next();
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
        
    }
}