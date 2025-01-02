import axios from "axios";

import { logout } from "./auth";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const authedHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

authedHttp.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

authedHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      logout();
    }

    return Promise.reject(error);
  },
);
