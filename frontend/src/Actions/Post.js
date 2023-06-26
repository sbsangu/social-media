import axios from "axios";
import { toast } from "react-toastify";

export const likePost=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"likeRequest"
        })
        const {data}=await axios.get(`${process.env.REACT_APP_BACKEND}/api/v1/post/${id}`,{
            withCredentials:true
        })

        dispatch({
            type:"likeSuccess",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({
            type:'likeFailure',
            payload:error.response.data.message
        })
    }
}

export const addCommentOnPost=(id,comment)=>async(dispatch)=>{
    try {
        dispatch({
            type:"addCommentRequest"
        })
        const {data}=await axios.put(`${process.env.REACT_APP_BACKEND}/api/v1/post/comment/${id}`,{comment},{
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials:true
        })

        dispatch({
            type:"addCommentSuccess",
            payload:data.message
        })
        
    } catch (error) {
        dispatch({
            type:'addCommentFailure',
            payload:error.response.data.message
        })
    }
}

export const deleteComment=(id,commentId)=>async(dispatch)=>{

    try {
        dispatch({
            type:"deleteCommentRequest"
        })

        const {data}=await axios.delete(`${process.env.REACT_APP_BACKEND}/api/v1/post/comment/${id}`,{data:
            {commentId:commentId}
        ,
     
        withCredentials:true,
        }
        
        )
        dispatch({
            type:"deleteCommentSuccess",
            payload:data?.message
        })

    } catch (error) {
        dispatch({
            type:"deleteCommentFailure",
            payload:error.response.data.message
        })
        
    }
}


export const createNeWPost=(caption,image)=>async(dispatch)=>{
    try {
        dispatch({
            type:"newPostRequest"
        })

        const {data}=await axios.post(`${process.env.REACT_APP_BACKEND}/api/v1/post/upload`,{caption,image},{
            headers:{
                "Content-Type":"application/json"
            },withCredentials:true
        })
        dispatch({
            type:"newPostSuccess",
            
        })
        toast.success(data.message)

    } catch (error) {
        dispatch({
            type:"newPostFailure",
            error:error.response.data.message
        })
    }
}


export const updateCaption=(caption,id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateCaptionRequest"
        })

        const {data}=await axios.put(`${process.env.REACT_APP_BACKEND}/api/v1/post/${id}`,{caption},{
            headers:{
                "Content-Type":"application/json"
            },withCredentials:true
        })
        dispatch({
            type:"updateCaptionSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"updateCaptionFailure",
            error:error.response.data.message
        })
    }
}


export const deletePost=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:"deletePostRequest"
        })

        const {data}=await axios.delete(`${process.env.REACT_APP_BACKEND}/api/v1/post/${id}`,{
            withCredentials:true,
        }
        )
        dispatch({
            type:"deletePostSuccess",
            payload:data.message
        })

    } catch (error) {
        dispatch({
            type:"deletePostFailure",
            error:error.response.data.message
        })
    }
}

export const updateProfile=(name,email,avatar)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updateProfileRequest"
        })

        const {data}=await axios.put(`${process.env.REACT_APP_BACKEND}/api/v1/update/profile`,{name,email,avatar},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

        dispatch({type:"updateProfileSuccess",
        payload:data.message
    })
        
    } catch (error) {
        dispatch({
            type:"updateProfileFailure",
            payload:error.response.data.message
        })
    }
}

export const updatePassword=(oldPassword,newPassword)=>async(dispatch)=>{
    try {
        dispatch({
            type:"updatePasswordRequest"
        })

        const {data}=await axios.put(`${process.env.REACT_APP_BACKEND}/api/v1/update/password`,{oldPassword,newPassword},{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        })

        dispatch({type:"updatePasswordSuccess",
        payload:data.message
    })
        
    } catch (error) {
        dispatch({
            type:"updatePasswordFailure",
            payload:error.response.data.message
        })
    }
}