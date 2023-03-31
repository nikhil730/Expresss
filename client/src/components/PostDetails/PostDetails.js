import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, Typography, Divider } from "@material-ui/core";
import { useSelector } from "react-redux";
import usestyles from "./styles";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import { useDispatch } from "react-redux";

const PostDetails = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    if (posts?.length === 0) {
      console.log("here");
      dispatch(getPosts());
    }
  }, [dispatch]);
  //console.log(posts);
  const classes = usestyles();
  const history = useHistory();
  const location = useLocation();
  const [locationstate, setLocationstate] = React.useState({
    name: "",
    tags: [],
    title: "",
    message: "",
    image: "",
  });
  React.useEffect(() => {
    //console.log(location);

    if (location.state) {
      //let _state=location.state as any
      setLocationstate(location.state);
    }
  }, [location]);

  const openPost = (props) =>
    history.push({
      pathname: `/posts/${props.id}`,
      state: {
        name: props.name,
        tags: props.tags,
        title: props.title,
        message: props.message,
        image: props.image,
        id: props.id,
      },
    });

  const title = locationstate.title;
  const imageurl = locationstate.image;
  const tags = locationstate.tags;
  const name = locationstate.name;
  const message = locationstate.message;
  const createdAt = Date(locationstate.createdAt);
  const id = locationstate.id;
  const recommendedPosts = posts.filter(({ _id }) => _id !== id);
  console.log("recommended posts");
  console.log(recommendedPosts);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {message}
          </Typography>
          <Typography variant="h6">Created by: {name}</Typography>
          {/* <Typography variant="body1">{moment(createdAt).fromNow()}</Typography> */}
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              imageurl ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ tags, title, name, message, likes, selectedFile, _id }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() =>
                    openPost({
                      name: name,
                      title: title,
                      message: message,
                      image: selectedFile,
                      id: _id,
                      tags: tags,
                    })
                  }
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};
export default PostDetails;
