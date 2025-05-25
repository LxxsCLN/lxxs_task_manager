import { Task } from "@/interfaces/tasks";
import { UserType } from "@/interfaces/users";
import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { getAllTasks } from "../api/tasks.js";
import { getAllUsers } from "../api/users.js";

type AppDataContextType = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    users: UserType[];
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
    loading: boolean;
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
    const { t } = useTranslation();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, tasksResponse] = await Promise.all([
                    getAllUsers(),
                    getAllTasks(),
                ]);
                setTasks(tasksResponse.data);
                setUsers(usersResponse.data);
                setLoading(false);
            } catch (error: AxiosError | any) {
                if (error.status === 401) {
                    toast.error(t("home.unauthorized"));
                } else {
                    toast.error(t("home.error"));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AppDataContext.Provider
            value={{ loading, tasks, setTasks, users, setUsers }}
        >
            {children}
        </AppDataContext.Provider>
    );
};
