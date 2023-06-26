import React from "react";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const User = ({ userId, name, avatar }) => {
  return (
    <Box mt={2}  justifyContent={"center"} display={"flex"}
      p={1}
      sx={{
        transition: "all 0.5s",
        "&:hover": {
          transform: "translateY(-10px)",
        },
        alignItems:"center"
      }}
    >
      <Link
        style={{
          textDecoration: "none",
          color: "black",
        }}
        to={`/user/${userId}`}
      >
        <Avatar
          src={avatar}
          alt={name}
          sx={{
            alignItems:"center",
            
            borderRadius: "80px",
            border: "2px solid pink",
            width: "40px",
            height: "40px",
          }}
        
        />
        <Typography alignItems={'center'} textAlign={'center'} >{name}</Typography>
      </Link>
    </Box>
  );
};

export default User;
