import { triggerLogout } from "@/lib/utils";
import axios from "axios";

const API = import.meta.env.VITE_APP_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            triggerLogout();
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;
