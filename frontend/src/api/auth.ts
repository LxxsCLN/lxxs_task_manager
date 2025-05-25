import axios from "./axios";

const API = import.meta.env.VITE_APP_SERVER_URL;

export const registerUser = async (data: {
    name: string;
    username: string;
    password: string;
    role?: string;
}) => {
    const response = await axios.post(`${API}/api/auth/register`, data);
    return response.data;
};

export const loginUser = async (data: {
    username: string;
    password: string;
}) => {
    const response = await axios.post(`${API}/api/auth/login`, data);
    return response.data;
};
