import Axios from 'axios';

const host = "https://belaundry-api.sebaris.link";
const axios = Axios.create({
  baseURL: host,
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
