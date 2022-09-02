import TokenService from "./token";
import axios from "axios";

const api = (contentType = "application/json") => {
  const instance = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
      "Content-Type": contentType,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default api;