import Home from "../Pages/Home";
import { useState } from "react";
import Authenticated from "../Pages/Authenticated";
import { Route, Switch } from "react-router-dom";

const Routers = () => {
  const token = window.localStorage.getItem("auth_token");
  const [authenticated, setAuthenticated] = useState(token && token);

  return (
    <>
      <Switch>
        {authenticated ? (
          <Route path="/authenticated">
            <Authenticated />
          </Route>
        ) : (
          <Route path="/">
            <Home setAuthenticated={setAuthenticated} />
          </Route>
        )}
      </Switch>
    </>
  );
};

export default Routers;
