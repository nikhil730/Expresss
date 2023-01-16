import React, { useState, useEffect } from "react";
import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";
import usestyles from "./styles";
import new_logo_img from "../../images/new_logo_img.jpg";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
  const classes = usestyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history.push("/auth");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodetoken = decode(token);
      if (decodetoken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Expresss
        </Typography>
        <img
          className={classes.image}
          src={new_logo_img}
          alt="Memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
