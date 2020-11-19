import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Home from "./Pages/Home";

import * as yup from "yup";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Home />
      </Switch>
    </div>
  );
};

export default App;
