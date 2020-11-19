import { AppBar, Toolbar, Button } from "@material-ui/core";
import SignUp from "../UserForm";
import Login from "../Login";
import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </>
  );
};

export default Home;
