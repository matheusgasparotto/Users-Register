import axios from "axios";

const Request = async ({ data, path }) => {
  const baseUrl = "https://ka-users-api.herokuapp.com/";
  const headers = { "Content-Type": "application/json" };

  let res = await axios.post(`${baseUrl}${path}`, data, { ...headers });

  return res;
};

export default Request;
