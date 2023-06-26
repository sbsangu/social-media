import cloudinary from "cloudinary"
import { postModel } from './../models/Post.js';
import { userModel } from './../models/User.js';

export const createPost=async(req,res)=>{
    try {
        const myCloud=await cloudinary.v2.uploader.upload(req.body.image,{
            folder:"posts",
        })
        const newPostData={
            caption:req.body.caption,
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            },
            owner:req.user._id
        }
        const post=await postModel.create(newPostData);

        const user=await userModel.findById(req.user._id);
        user.posts.unshift(post._id);

        await user.save();

        res.status(201).send({
            success:true,
            post,
            message:"Post created successfully"
        })
        
    } catch (error) {
        
        res.status(500).send({
            success:false,
            message:error.message
        })
    }



}

export const deletePost=async (req, res) => {

    try {
        const post =await postModel.findById(req.params.id);
        if(!post){
            return res.status(404).send({
                success:false,
                messsage:"post not found"
            })
        }
        if(post.owner.toString()!==req.user._id.toString()){
            return res.status(401).send({
                success:false,
                message:"Unauthorized"
            })
        }
await cloudinary.v2.uploader.destroy(post.image.public_id)

        await postModel.findByIdAndDelete(req.params.id)
        const user=await userModel.findById(req.user._id)
        user.posts.pull(req.params.id);
        await user.save();

        res.status(200).send({
            success:true,
            message:"Post deleted",
            
        })
        
    } catch (error) {
       
        return res.status(500).send({
            success:false,
            message:error.message
        })
    }
}



export const likeAndUnlikePost=async(req,res)=>{

    try {
        
        const post=await postModel.findById(req.params.id)
        if (!post) {
            return res.status(404).send({
              success: false,
              message: 'Post not found'
            })
          }

    if(post.likes.includes(req.user._id)){
        post.likes.pull(req.user._id)
        await post.save()
        
    return res.status(200).send({
        success:true,
        message:"Post Unliked",
        post
    })
    }
    else{
        post.likes.push(req.user._id)
        await post.save()
        
    return res.status(200).send({
        success:true,
        message:"Post liked",
        post
    })
    }

   

    } catch (error) {
        
        res.status(500).send({

            success:false,
            message:error.message
        })
        
    }

}
//update caption

export const updateCaption = async(req, res) =>{
    try {

        const post =await postModel.findById(req.params.id)
        if(!post){
            return res.status(404).send({
                success:false,
                message:"Post Not Found"
            })
        }
        if(post.owner.toString()!== req.user._id.toString()){
            return res.status(401).send({
                success:false,
                message:"Unauthorized"
            })
        }
        post.caption=req.body.caption

        await post.save()
        res.status(200).send({
        success:true,
        message:'Caption update successfully'
    })
        

    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
}

//adding comment

export const commentOnPost = async(req, res) => {
    try {

        const post=await postModel.findById(req.params.id)
        if(!post){
            return res.status(404).send({
                success:false,
                message:"Post not found"
            })
        }

       

        let commentIndex=-1

        //checking if comment is already added 
       
       post.comments.forEach((item,index)=>{
            if(item.user.toString()=== req.user._id.toString()){
                commentIndex=index
            }
           
            
        })
     
 


     
        if(commentIndex!==-1){
            post.comments[commentIndex].comment=req.body.comment
           
            await post.save()
            return res.status(200).send({
                success:true,
                message:"Comment updated"
            })

        }
        else{
            post.comments.push({
                user:req.user._id,
                comment:req.body.comment
            })
            
            await post.save()
            return res.status(200).send({
                success:true,
                message:"Comment added"
            })


        }

        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
}

///deleting comment
export const deleteComment = async(req, res)=>{
    try {
        const post=await postModel.findById(req.params.id)
        if(!post){
            return res.status(404).send({
                success:false,
                message:"Post not found"
            })
        }


        if(post.owner.toString()===req.user._id.toString()){
            if(req.body.commentId===undefined){
               return res.status(400).send({
                success:false,
                message:"CommentId is required"
               })
            }
            post.comments.forEach((item,index)=>{
                if(item._id.toString()===req.body.commentId.toString()){
                    return post.comments.splice(index,1)
    
                
                }


        })
        await post.save()
        return res.status(200).send({
            success:true,
            message:"selected comment deleted"
        })
    }

        else{   
           post.comments.forEach((item,index)=>{
            if(item.user.toString() === req.user._id.toString()){
                return post.comments.splice(index,1)

            
            }
 

           })
           await post.save()
        return res.status(200).send({
            success:true,
            message:"Your comment has been deleted "
        })
        }


        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
        
    }
}