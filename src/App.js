import "./App.css";
import { Route, Switch, Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, AppBar, Toolbar, Button } from "@material-ui/core";
import SignUp from "./Pages/UserForm";
import Login from "./Pages/Login";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { register, unregister, handleSubmit, setValue, errors } = useForm();

  const schema = yup.object().shape({});

  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleSignUp = () => {
    history.push("/signup");
  };

  useEffect(() => {
    setMenuOpen(true);
  }, []);

  return (
    <div className="App">
      <div className={menuOpen ? "menu-open" : "menu"}>
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
      </div>
      <Switch>
        <Login />
        <Route exact path="/:local">
          {/* <SignUp /> */}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
