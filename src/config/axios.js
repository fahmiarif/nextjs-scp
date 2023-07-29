import Axios from 'axios';

const axios = Axios.create({
  baseURL: "https://belaundry-api.sebaris.link",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
