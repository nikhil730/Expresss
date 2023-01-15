import React, {useEffect} from "react";
import {Paper,Typography,CircularProgress,Divider} from "@material-ui/core"
import { useDispatch,useSelector } from "react-redux";
import moment from "moment";
import { useParams,useHistory } from "react-router-dom";

import usestyles from "./styles";

const PostDetails=()=>{
    const {post,posts,isLoading}=useSelector((state)=> state.posts);
    const dispatch=useDispatch();
    const history=useHistory();
    const classes=usestyles();
    const {id}=useParams();

    return (
        <div>Post details</div>
    )
};

export default PostDetails;