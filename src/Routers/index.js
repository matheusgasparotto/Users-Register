import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import SignUp from "../Pages/UserForm";
import Login from "../Pages/Login";
import MenuHome from "../components/MenuHome";
import MenuAuthenticated from "../components/MenuAuthenticated";
import UsersList from "../Pages/UsersList";
import FormFeedbacks from "../Pages/FormFeedback";
import { HomeIcon } from "../components/Icons";
import { IconContainer } from "../globalStyles";

const Routers = () => {
  const history = useHistory();

  const token = window.localStorage.getItem("auth_token");
  const [authenticated, setAuthenticated] = useState(token);

  useEffect(() => {
    token && history.push("/authenticated");
  });

  return (
    <>
      {!authenticated ? <MenuHome /> : <MenuAuthenticated />}
      <Switch>
        {authenticated ? (
          <>
            <Route exact path="/authenticated" />
            <Route exact path="/users">
              <UsersList list={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
            </Route>
            <Route exact path="/feedbacks"></Route>
            <Route exact path="/feedback-form">
              <FormFeedbacks />
            </Route>
            <Route exact path="/contact"></Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <IconContainer home>
                <HomeIcon />
              </IconContainer>
            </Route>
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
