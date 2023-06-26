import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true,'Please enter a email'],
        unique:[true,'Email Already Exists']
    },
    password:{
        type: String,
        required:[ true,"Please enter a password"],
        minLength:[6,"Password must be greater than 6 letters"],
        select:false
    },
    avatar:{
        public_id:String,
        url:String
    },
   
   posts:[
    
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
   ],
   followers:[
    {
        type:String,
        ref:"User"
}
   ],
   following:[
    {
        type:String,
        ref:"User"
}
   ],
   resetPasswordToken:String,
   resetPasswordExpire:String

},{timestamps:true});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
})

userSchema.methods.matchPassword=async function(password){
    return bcrypt.compare(password,this.password)
}

userSchema.methods.getJwtToken= function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:"90d"
    })

}
   

userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).toString("hex")
    this.resetPasswordExpire=Date.now() + 1000*60*10


        return resetToken;

}


export const userModel=mongoose.model("User",userSchema);


