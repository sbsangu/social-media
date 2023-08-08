import {configureStore} from "@reduxjs/toolkit"
import { likeReducers, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import {  postOfFollowingReducers, userReducer,allUserReducers, userProfileReducers} from "./Reducers/User";


// export const server=`http://localhost:4000/api/v1`
 const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:postOfFollowingReducers,
        allUsers:allUserReducers,
        like:likeReducers,
        myPosts:myPostsReducer,
        userProfile:userProfileReducers,
        userPosts:userPostsReducer,
    }
})

export default store;