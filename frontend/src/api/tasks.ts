import { CreateTask } from "@/interfaces/tasks";
import axios from "./axios";

const API = import.meta.env.VITE_APP_SERVER_URL;

export const getTaskById = (id: string) => axios.get(`${API}/api/tasks/${id}`);

export const getAllTasks = () => axios.get(`${API}/api/tasks/all`);

export const createTask = (task: CreateTask) =>
    axios.post(`${API}/api/tasks`, JSON.stringify(task), {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const updateTask = (id: string, task: CreateTask) =>
    axios.put(`${API}/api/tasks/${id}`, JSON.stringify(task), {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const deleteTask = (id: string) =>
    axios.delete(`${API}/api/tasks/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
