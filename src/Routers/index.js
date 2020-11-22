/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import SignUp from "../Pages/UserForm";
import Login from "../Pages/Login";
import MenuHome from "../components/MenuHome";
import MenuAuthenticated from "../components/MenuAuthenticated";
import UsersList from "../Pages/UsersList";
import FormFeedbacks from "../Pages/FormFeedback";
import { HomeIcon } from "../components/Icons";
import { IconContainer } from "../globalStyles";
import FeedbacksList from "../Pages/FeedbacksList";
import { useState, useEffect } from "react";
import { usersRequest } from "../Request/Request";

const Routers = () => {
  const token = window.localStorage.getItem("auth_token");

  const [list, setList] = useState([]);

  const requestUsers = async () => {
    const path = `/users`;
    setList(await usersRequest(token, path));
  };

  const location = useLocation();
  useEffect(() => {
    token && requestUsers();
  }, [location]);

  return (
    <>
      {token ? <MenuAuthenticated /> : <MenuHome />}
      <Switch>
        {token ? (
          <>
            <Route exact path="/users">
              <UsersList list={list} />
            </Route>
            <Route exact path="/feedbacks">
              <FeedbacksList />
            </Route>
            <Route path="/feedbacks/:id">
              <FeedbacksList />
            </Route>
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
