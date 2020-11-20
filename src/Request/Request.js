import axios from "axios";

export const Request = async ({ data, path }) => {
  const baseUrl = "https://ka-users-api.herokuapp.com/";
  const headers = { "Content-Type": "application/json" };

  let res = await axios.post(`${baseUrl}${path}`, data, { ...headers });

  return res;
};

export const usersRequest = async ({ token, path }) => {
  const baseURL = "https://ka-users-api.herokuapp.com";
  const Path = path;

  const headers = { Authorization: token, "Content-Type": "application/json" };
  let res = await axios.get(baseURL + Path, headers);
  return res;
};

export const sendFeedback = async ({ token, data, user_id }) => {
  const baseURL = "https://ka-users-api.herokuapp.com";
  const Path = `/users/${user_id}/feedbacks`;

  const headers = { Authorization: token, "Content-Type": "application/json" };
  let res = await axios.get(baseURL + Path, data, headers);
  return res;
};
