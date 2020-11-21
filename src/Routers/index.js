import { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import SignUp from "../Pages/UserForm";
import Login from "../Pages/Login";
import MenuHome from "../components/MenuHome";
import MenuAuthenticated from "../components/MenuAuthenticated";
import UsersList from "../Pages/UsersList";
import FormFeedbacks from "../Pages/FormFeedback";
import { HomeIcon } from "../components/Icons";
import { IconContainer } from "../globalStyles";

const Routers = () => {
  const token = window.localStorage.getItem("auth_token");

  return (
    <>
      {!token ? <MenuHome /> : <MenuAuthenticated />}
      <Switch>
        {token ? (
          <>
            <Route exact path="/users">
              <UsersList />
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
              <Login />
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
