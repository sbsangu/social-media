import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  Search,
  SearchOutlined,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import "./Header.css";

const Header = () => {
  
   
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <Box
      width={"100%"}
      className="Header"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ["1rem", "6rem"],
        mt: "20px",
        padding: "5px",
      }}
    >
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? (
          <Home
            style={{
              color: "black",
              fontSize: "4xl",
            }}
          />
        ) : (
          <HomeOutlined />
        )}
        </Link>
     
     
      <Link to={"/newpost"} onClick={()=>setTab("/newpost")}>
        {" "}
        {tab === "/newpost" ? (
          <Add
            style={{
              color: "black",
            }}
          />
        ) : (
          <AddOutlined />
        )}
      </Link>
     
      <Link to="/search" onClick={() => setTab("/search")}>
        {" "}
        {tab === "/search" ? (
          <Search
            style={{
              color: "black",
            }}
          />
        ) : (
          <SearchOutlined />
        )}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {" "}
        {tab === "/account" ? (
          <AccountCircle
            style={{
              color: "black",
            }}
          />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </Box>
  );
};

export default Header;
