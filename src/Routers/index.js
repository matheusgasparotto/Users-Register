/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Switch, useHistory } from "react-router-dom";
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
import { token } from "../helpers";

const Routers = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const [list, setList] = useState([]);

  const requestUsers = async () => {
    console.log("oi");
    const path = `/users`;
    setList(await usersRequest(token, path));
  };

  const history = useHistory();
  useEffect(() => {
    token && history.push("/users");
    token && requestUsers();
  }, []);

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