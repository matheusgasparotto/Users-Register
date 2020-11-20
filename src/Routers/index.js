import { useEffect, useState } from "react";
import Authenticated from "../Pages/Authenticated";
import { Route, Switch, useHistory } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import SignUp from "../Pages/UserForm";
import Login from "../Pages/Login";

const Routers = () => {
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

  const token = window.localStorage.getItem("auth_token");
  const [authenticated, setAuthenticated] = useState(token);

  useEffect(() => {
    token && history.push("/authenticated");
  });

  return (
    <>
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
        {authenticated ? (
          <Route exact path="/authenticated">
            <Authenticated />
          </Route>
        ) : (
          <>
            <Route exact path="/login">
              <Login setAuthenticated={setAuthenticated} />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
};

export default Routers;
