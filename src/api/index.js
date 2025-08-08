import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );