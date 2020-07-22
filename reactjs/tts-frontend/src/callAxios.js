import axios from "axios";
// export const API_URL = "http://tts-banking.herokuapp.com";
export const API_URL = "http://tts-bank.herokuapp.com";
export const connector = axios.create({ baseURL: API_URL });
// const token = localStorage.getItem("token");
const accessToken = localStorage.getItem("accessToken");
connector.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
    }
    console.log(config);
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

connector.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);
