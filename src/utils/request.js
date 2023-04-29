import axios from "axios";
import { redirect } from "react-router-dom";
import { getToken, removeToken } from "./token";

const request = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

// add an interceptor for requests
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// add an interceptor for responses
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      redirect("/login");
      removeToken();
    }
    return Promise.reject(error);
  }
);

export { request };
