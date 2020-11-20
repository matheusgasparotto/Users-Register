import axios from "axios";

export const Request = async ({ data, path }) => {
  const baseUrl = "https://ka-users-api.herokuapp.com/";
  const headers = { "Content-Type": "application/json" };

  let res = await axios.post(`${baseUrl}${path}`, data, headers);

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
  console.log(user_id);
  console.log(token);
  console.log(data);
  const headers = {
    headers: {
      Authorization: token,
    },
  };

  let res = await axios.post(`${baseURL}${Path}`, data, headers);

  console.log(res);
  return res;
};
