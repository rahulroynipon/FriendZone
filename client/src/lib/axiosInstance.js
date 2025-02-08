import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}/api/v1`,
});

export default axiosInstance;
