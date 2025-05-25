import axios from "./axios";

const API = import.meta.env.VITE_APP_SERVER_URL;

export const getAllUsers = () => axios.get(`${API}/api/users/all?role=user`);
