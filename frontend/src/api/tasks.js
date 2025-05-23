import axios from "axios";

const API = "http://localhost:5000/api/tasks";

export const getTasks = () => axios.get(API);
export const createTask = (task) => axios.post(API, task);
