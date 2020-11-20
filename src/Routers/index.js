import Home from "../Pages/Home";
import { useEffect, useState } from "react";
import Authenticated from "../Pages/Authenticated";
import { Route, Switch, useHistory } from "react-router-dom";

const Routers = () => {
  const token = window.localStorage.getItem("auth_token");
  const [authenticated, setAuthenticated] = useState(token);

  const history = useHistory();

  useEffect(() => {
    token && history.push("/authenticated");
  });

  return (
    <>
      <Switch>
        {authenticated ? (
          <Route exact path="/authenticated">
            <Authenticated />
          </Route>
        ) : (
          <Route>
            <Home setAuthenticated={setAuthenticated} />
          </Route>
        )}
      </Switch>
    </>
  );
};

export default Routers;
