import axios from "axios";
import { toast } from 'react-toastify';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/v1/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );


    dispatch({
      type: "LoginSuccess",
      payload: data?.user,
    });
    toast.success(data.message)
  } catch (error) {
    
    dispatch({
      type: "LoginFailure",
      payload: error.message,
    });
  }
};

export const registerUser=( name, email, password ,avatar)=>async(dispatch)=>{
  try {
    dispatch({
      type:"RegisterRequest"
    })

    const {data}=await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/register`,{avatar,name,email,password},{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    })
    dispatch({type:"RegisterSuccess",
  payload:data.user
})
toast.success(data.message)


    
  } catch (error) {
    dispatch({type:"RegisterFailure",
    payload:error.response.data.message
  })
    toast.success(error.response.data.message)
    dispatch({type:"clearErrors"})
  }

  

}

export const logoutUser = ()=>async(dispatch)=>{
  try {
    dispatch({
      type:'LogoutUserRequest'
    })

    const {data}=await axios.get( `${process.env.REACT_APP_BACKEND}/api/v1/logout`,{
      withCredentials:true,
    })

    dispatch({
      type:"LogoutUserSuccess",

     
    })
    toast.success(data.message)
   
    
  } catch (error) {

    dispatch({
      type:"LogoutUserFailure",
      payload:error.response.data.message
    })
    
  }
}

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const {data} = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/v1/me`,
      {
        withCredentials:true
      }
    );

    dispatch({
      type: "LoadUserSuccess",
      payload: data?.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};


export const getFollowingPosts=()=>async(dispatch)=>{
  try {
    dispatch({
      type:" postOfFollowingRequest"
    })

    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/posts`,{
      withCredentials:true,
    })
    dispatch({
      type:"postOfFollowingSuccess",
      payload:data?.posts
    })
  } catch (error) {
    dispatch({
      type:"postOfFollowingFailure",
      payload: error.response.data.message
    })
  }
}

export const getAllUsers=(name=" ")=>async(dispatch)=>{
  try {
    dispatch({
      type:"allUsersRequest"
    })

    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/users?name=${name}`,{
      withCredentials:true,
    })
   
    dispatch({
      type:"allUsersSuccess",
      payload:data?.users,
    })
  } catch (error) {
    dispatch({
      type:"allUsersFailure",
      payload:error.response.data.message
    })
  }
}

export const getMyPosts=()=>async(dispatch)=>{
  try {

    dispatch({
      type:"myPostRequest"
    })

    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/my/posts`,{
      withCredentials:true,
    })

    dispatch({
      type:"myPostSuccess",
      payload:data.posts,
    })
    
  } catch (error) {

    dispatch({
      type:"myPostFailure",
      payload:error.response.data.message
    })
    
  }
}


export const deleteMyProfile=()=>async(dispatch)=>{
  try {
      dispatch({
          type:"deleteProfileRequest"
      })

      const {data}=await axios.delete(`${process.env.REACT_APP_BACKEND}/api/v1/delete/me`,{
         
          withCredentials:true
      })

      

      dispatch({type:"deleteProfileSuccess",
      payload:data.message
  })
  
  

  
      
  } catch (error) {
    toast.error(error.response.data.message)
      dispatch({
          type:"deleteProfileFailure",
          payload:error.response.data.message
      })
      dispatch({type:"clearErrors"})
  }
}

export const forgotPassword=(email)=>async(dispatch)=>{
  try {
      dispatch({
          type:"forgotPasswordRequest"
      })

      const {data}=await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/forgot/password`,{email},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      

      dispatch({type:"forgotPasswordSuccess",
      payload:data.message
  })
  
  

  
      
  } catch (error) {
   
      dispatch({
          type:"deleteProfileFailure",
          payload:error.response.data.message
      })
      
  }
}


export const resetPassword=(token,password)=>async(dispatch)=>{
  try {
      dispatch({
          type:"resetPasswordRequest"
      })

      const {data}=await axios.put(`${process.env.REACT_APP_BACKEND}/api/v1/password/reset/${token}`,{password},{
        headers:{
          "Content-Type":"application/json"
        }
      })
      

      dispatch({type:"resetPasswordSuccess",
      payload:data.message
  })
  
  

  
      
  } catch (error) {
   
      dispatch({
          type:"resetPasswordFailure",
          payload:error.response.data.message
      })
      
  }
}


export const userPosts=(id)=>async(dispatch)=>{
  
  try {

   

    dispatch({
      type:"userPostsRequest"
    })

    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/userposts/${id}`,{
      withCredentials:true,
    })
    console.log(data);

    dispatch({
      type:"userPostsSuccess",
      payload:data.posts,
    })
   
    
  } catch (error) {

    dispatch({
      type:"userPostsFailure",
      payload:error.response.data.message
    })
    
  }
}


export const userProfile=(id)=>async(dispatch)=>{
  try {

    dispatch({
      type:"userProfileRequest"
    })

    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/user/${id}`,{
      withCredentials:true,
    })

    dispatch({
      type:"userProfileSuccess",
      payload:data.user,
    })
    
  } catch (error) {

    dispatch({
      type:"userProfileFailure",
      payload:error.response.data.message
    })
    
  }
}

export const followAndUnfollowUser=(id)=>async(dispatch)=>{
  try {

    dispatch({
      type:"followUserRequest"
    })

    const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/follow/${id}`,{
      withCredentials:true,
    })

    dispatch({
      type:"followUserSuccess",
      payload:data.message,
    })
    toast.success(data.message)
  } catch (error) {

    dispatch({
      type:"followUserFailure",
      payload:error.response.data.message
    })
    toast.error(error.response.data.message)
    
  }
}