import axios from "axios";

export const api = axios.create({
  // baseURL: "https://darcbe-production.up.railway.app/",
  baseURL: "http://localhost:8001/",
  headers: {
    "Content-Type": "application/json",
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
},
  (error) => Promise.reject(error)
);
