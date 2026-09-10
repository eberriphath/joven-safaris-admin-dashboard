import axios from "axios";
import { getToken } from "../services/auth";

const api = axios.create({
  baseURL: "https://joven-safaris-backend.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;