import axios from "axios";

const API = `${import.meta.env.VITE_APP_SERVER_URL}/api/users/all/users`;

export const getAllUsers = () => axios.get(API);
