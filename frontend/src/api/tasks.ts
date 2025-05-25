import { CreateTask } from "@/interfaces/tasks";
import axios from "./axios";

const API = import.meta.env.VITE_APP_SERVER_URL;

export const getTaskById = (id: string) => axios.get(`${API}/api/tasks/${id}`);

export const getAllTasks = (
    searchTerm: string,
    statusFilter: string,
    priorityFilter: string,
    userFilter: string
) =>
    axios.get(
        `${API}/api/tasks/all?search=${searchTerm}&status=${statusFilter}&priority=${priorityFilter}&user_id=${userFilter}`
    );

export const createTask = (task: CreateTask) =>
    axios.post(`${API}/api/tasks`, JSON.stringify(task), {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const updateTask = (task: CreateTask) =>
    axios.put(`${API}/api/tasks`, JSON.stringify(task), {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const completeTask = (id: number, notes: string) =>
    axios.put(`${API}/api/tasks/complete`, JSON.stringify({ notes, id }), {
        headers: {
            "Content-Type": "application/json",
        },
    });

export const deleteTask = (id: number) =>
    axios.delete(`${API}/api/tasks/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
