import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import SignUp from "./Pages/UserForm";
import Login from "./Pages/Login";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
      </Switch>
      <Switch>
        <SignUp />
      </Switch>
    </div>
  );
};

export default App;
