import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertCircle,
    Calendar,
    Filter,
    Plus,
    Search,
    User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllTasks } from "../api/tasks.js";

const Home = () => {
    const { t } = useTranslation();

    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllTasks();
                setTasks(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || task.status === statusFilter;
            const matchesPriority =
                priorityFilter === "all" || task.priority === priorityFilter;
            const matchesUser =
                userFilter === "all" || task.user.name === userFilter;

            return (
                matchesSearch && matchesStatus && matchesPriority && matchesUser
            );
        });
    }, [searchTerm, statusFilter, priorityFilter, userFilter]);

    const taskStats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(
            (task) => task.status === "completed"
        ).length;
        const inProgress = tasks.filter(
            (task) => task.status === "in-progress"
        ).length;
        const urgent = tasks.filter(
            (task) => task.priority === "urgent"
        ).length;

        return { total, completed, inProgress, urgent };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {t("home.title")}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {t("home.description")}
                        </p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {t("home.newTask")}
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        {t("home.totalTasks")}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {taskStats.total}
                                    </p>
                                </div>
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Calendar className="h-4 w-4 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        {t("home.completed")}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {taskStats.completed}
                                    </p>
                                </div>
                                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <Calendar className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        {t("home.inProgress")}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {taskStats.inProgress}
                                    </p>
                                </div>
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="h-4 w-4 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        {t("home.urgent")}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {taskStats.urgent}
                                    </p>
                                </div>
                                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            {t("home.filters")}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium">
                                    {t("home.search")}
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder={t("home.searchTasks")}
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
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
                                        <SelectValue
                                            placeholder={t("home.allStatuses")}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t("home.allStatuses")}
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            {t("home.pending")}
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            {t("home.inProgress")}
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            {t("home.completed")}
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
                                        <SelectValue
                                            placeholder={t(
                                                "home.allPriorities"
                                            )}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t("home.allPriorities")}
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
                                            {t("home.urgent")}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-medium">
                                    {t("home.assignedUser")}
                                </label>
                                <Select
                                    value={userFilter}
                                    onValueChange={setUserFilter}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={t("allUsers")}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t("home.allUsers")}
                                        </SelectItem>
                                        {users.map((user) => (
                                            <SelectItem key={user} value={user}>
                                                {user}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Home;
