import app from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import  cloudinary from "cloudinary"


config()
connectDB();

const PORT=process.env.PORT||4000;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
  });

app.listen(PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
}


)