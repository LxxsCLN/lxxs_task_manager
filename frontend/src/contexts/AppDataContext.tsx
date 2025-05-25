import { Task } from "@/interfaces/tasks";
import { UserType } from "@/interfaces/users";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.js";
import { getAllUsers } from "../api/users.js";

type AppDataContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    users: UserType[];
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error("useAppData must be used within an AppDataProvider");
    }
    return context;
};

export const AppDataProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, tasksResponse] = await Promise.all([
                    getAllUsers(),
                    getAllTasks(),
                ]);
                setTasks(tasksResponse.data);
                setUsers(usersResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <AppDataContext.Provider value={{ tasks, setTasks, users, setUsers }}>
            {children}
        </AppDataContext.Provider>
    );
};
