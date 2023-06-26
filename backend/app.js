import express from "express"
import post from "./routes/post.js"
import user from "./routes/user.js"
import cookieParser from "cookie-parser";
import cors from "cors";


const app=express();
//middlewares



app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ limit:'50mb',extended:true }))
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}
));

 



app.use("/api/v1",post)


app.use("/api/v1",user)





export default app;