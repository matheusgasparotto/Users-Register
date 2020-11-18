import "./App.css";
import { Route, Switch, Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Input,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";

const App = () => {
  const { register, unregister, handleSubmit, setValue, errors } = useForm();

  const schema = yup.object().shape({});

  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleSignUp = () => {
    history.push("/signup");
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
          <Button color="inherit" onClick={handleSignUp}>
            Sign-up
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/:local">
          <Login />
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
