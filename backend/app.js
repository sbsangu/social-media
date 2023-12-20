import express from "express";
import post from "./routes/post.js";
import user from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
//middlewares

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ limit:'50mb',extended:true }))
app.use(cookieParser())

app.use(cors());
 
app.get("/", (req, res) => {
  res.send(
    `<h1>Site is workin fine.Click <a href=${process.env.FRONTEND_URL}>Here </a> to get frontend</h1>`
  );
});

app.use("/api/v1", post);

app.use("/api/v1", user);

export default app;
