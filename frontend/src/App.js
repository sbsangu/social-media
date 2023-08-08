import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, userPosts, userProfile } from "./Actions/User";
import Home from "./components/Home/Home";
import Account from "./components/Account";
import NewPost from "./components/NewPost";
import Register from "./components/Register";
import UpdateProfile from "./components/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserProfile from "./components/UserProfile";
import Loader from "./components/Loader";
import Search from "./components/Search";

function App() {
  const dispatch = useDispatch();
  
  

  const { isAuthenticated,user:me } = useSelector((state) => state.user);
 
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  
  useEffect(() => {
   
    
    
    dispatch({ type: "clearMessage" });
   

    
    dispatch({ type: "clearErrors" });
  }, [dispatch]);
 
 
 

  return (
    <>
      <Router>
       <Header />
        <Routes>
          <Route path={"/"} element={isAuthenticated ? <Home /> : <Login/> } />

          {isAuthenticated && <Route path="/login" element={<Home />} />}
          <Route path="/login" element={<Login />} />

           <Route path="/account" element={<Account />} />

          <Route path="/newpost" element={<NewPost />} />

          <Route path={"/register"} element={<Register />} />

          <Route path={"/update/profile"} element={<UpdateProfile />} />
          <Route path="/update/password" element={<UpdatePassword />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
    <Route path="/user/:id" element={isAuthenticated ? <UserProfile />: <Loader/> } />

    <Route path="/search" element={<Search/>}/>
     
  
        </Routes>
      </Router>
    </>
  );
}

export default App;
