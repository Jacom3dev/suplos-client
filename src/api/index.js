import axios from "axios";

const baseURL = import.meta.env.VITE_URL_API;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error de red:', error);
    return Promise.reject(error);
  }
);
