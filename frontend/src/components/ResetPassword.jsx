import { Box, Button, Input, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useState } from "react";
import { forgotPassword, resetPassword } from "../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const navigate=useNavigate()
  const { loading, error, message } = useSelector((state) => state.like);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(params.token, newPassword));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/login")
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [ message, error]);

  return (
    <Box >
      <form onSubmit={submitHandler}>
        <Box 
          
          height={"100vh"}
          my={"auto"} mx={"auto"}
          maxWidth={"lg"}
          sx={{ backgroundColor: "beige" }}
         
          display={"flex"}
          justifyContent={"center"}
          gap={6}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Typography variant="h3" fontFamily={"fantasy"}>
            Social Apz
          </Typography>
          <Input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Link style={{textDecoration:"none" ,border:"2px solid black",padding:12, }} to={"/forgot/password"}>
            <Typography sx={{ transition:"all 0.53","&:hover":{transform:"scale(1.05)"}}} color={'gray'}> Request Another Token</Typography>
          </Link>
          <Button disabled={loading} variant="contained" type="submit">
            Update Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPassword;
