import Home from "../Pages/Home";
import { useState } from "react";
import Authenticated from "../Pages/Authenticated";

const Routers = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      {authenticated ? (
        <Authenticated />
      ) : (
        <Home setAuthenticated={setAuthenticated} />
      )}
    </>
  );
};

export default Routers;
