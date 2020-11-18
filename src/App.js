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
import MenuIcon from "@material-ui/icons/Menu";

const App = () => {
  const { register, unregister, handleSubmit, setValue, errors } = useForm();

  const schema = yup.object().shape({});

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign-up</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route></Route>
      </Switch>
    </div>
  );
};

export default App;
