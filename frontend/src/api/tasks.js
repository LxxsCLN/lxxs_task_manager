import axios from "axios";

const API = `${import.meta.env.VITE_APP_SERVER_URL}/api/tasks/all`;

export const getAllTasks = () => axios.get(API);
