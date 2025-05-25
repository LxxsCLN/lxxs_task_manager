import { getAllTasks } from "@/api/tasks.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppData } from "@/contexts/AppDataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useDebounce } from "@/hooks/useDebounce";
import { UserType } from "@/interfaces/users";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export const TaskFilters = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { users, setTasks } = useAppData();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [userFilter, setUserFilter] = useState<string>("all");
    const { showLoader, hideLoader } = useLoading();

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                showLoader();
                const response = await getAllTasks(
                    debouncedSearchTerm,
                    statusFilter,
                    priorityFilter,
                    userFilter
                );
                setTasks(response.data);
            } catch (error) {
                toast.error("home.error");
            } finally {
                hideLoader();
            }
        };

        fetchTasks();
    }, [debouncedSearchTerm, statusFilter, priorityFilter, userFilter]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    {t("home.filters")}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                        user?.role === "admin"
                            ? "lg:grid-cols-4"
                            : "lg:grid-cols-3"
                    } gap-4`}
                >
                    <div
                        className={`flex flex-col space-y-2 ${
                            user?.role !== "admin"
                                ? "sm:col-span-2 lg:col-span-1"
                                : ""
                        }`}
                    >
                        <label className="text-sm font-medium">
                            {t("home.search")}
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder={t("home.searchTasks")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                            {t("home.status")}
                        </label>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t("home.all")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    {t("home.all")}
                                </SelectItem>
                                <SelectItem value="pending">
                                    {t("home.multiPending")}
                                </SelectItem>
                                <SelectItem value="in_progress">
                                    {t("home.in_progress")}
                                </SelectItem>
                                <SelectItem value="completed">
                                    {t("home.multiCompleted")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                            {t("home.priority")}
                        </label>
                        <Select
                            value={priorityFilter}
                            onValueChange={setPriorityFilter}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t("home.all2")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    {t("home.all2")}
                                </SelectItem>
                                <SelectItem value="low">
                                    {t("home.low")}
                                </SelectItem>
                                <SelectItem value="medium">
                                    {t("home.medium")}
                                </SelectItem>
                                <SelectItem value="high">
                                    {t("home.high")}
                                </SelectItem>
                                <SelectItem value="urgent">
                                    {t("home.multiUrgent")}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {user?.role === "admin" && (
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium">
                                {t("home.assignedUser")}
                            </label>
                            <Select
                                value={userFilter}
                                onValueChange={setUserFilter}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={t("home.all")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        {t("home.all")}
                                    </SelectItem>
                                    {users.map((user: UserType) => (
                                        <SelectItem
                                            key={user.id}
                                            value={`${user.id}`}
                                        >
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskFilters;
