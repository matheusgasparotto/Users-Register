import axios from "axios";

const registerRequest = ({ data, path }) => {
  const baseUrl = "https://ka-users-api.herokuapp.com/";
  const headers = { "Content-Type": "application/json" };

  axios
    .post(`${baseUrl}${path}`, data, { ...headers })
    .then((res) => console.log(res));
};

export default registerRequest;
