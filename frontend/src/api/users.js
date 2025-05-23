import axios from "axios";

const API = `${import.meta.env.VITE_APP_SERVER_URL}/api/users`;

export const getUsers = () => axios.get(API);
