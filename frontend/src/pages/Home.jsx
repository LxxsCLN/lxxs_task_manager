import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LanguageToggle from "@/components/ui/language-toggle";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
import { getAllUsers } from "../api/users.js";

const statusColors = {
    pending: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
};

const priorityColors = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
};

const Home = () => {
    const { t } = useTranslation();

    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [userFilter, setUserFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 6;

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

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || task.status === statusFilter;
            const matchesPriority =
                priorityFilter === "all" || task.priority === priorityFilter;
            const matchesUser =
                userFilter === "all" || task.user_id === userFilter;

            return (
                matchesSearch && matchesStatus && matchesPriority && matchesUser
            );
        });
    }, [searchTerm, statusFilter, priorityFilter, userFilter, tasks]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredTasks]);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const taskStats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(
            (task) => task.status === "completed"
        ).length;
        const inProgress = tasks.filter(
            (task) => task.status === "in_progress"
        ).length;
        const urgent = tasks.filter(
            (task) => task.priority === "urgent"
        ).length;

        return { total, completed, inProgress, urgent };
    }, [tasks]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 dark:bg-black">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center sm:text-start">
                            {t("home.title")}
                        </h1>
                        <p className="text-gray-600 mt-1 dark:text-gray-300 text-center sm:text-start">
                            {t("home.description")}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                        <Button className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            {t("home.newTask")}
                        </Button>
                        <div className="flex gap-4">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
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
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
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
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
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
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {t("home.multiUrgent")}
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
                                            placeholder={t("home.all")}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t("home.all")}
                                        </SelectItem>
                                        <SelectItem value="pending">
                                            {t("home.multiPending")}
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            {t("home.inProgress")}
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
                                        <SelectValue
                                            placeholder={t("home.all2")}
                                        />
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
                                            placeholder={t("home.all")}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            {t("home.all")}
                                        </SelectItem>
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tasks Grid */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            {t("home.tasks")} ({filteredTasks.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedTasks.map((task) => (
                            <Card
                                key={task.id}
                                className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-md"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg line-clamp-2">
                                            {task.title}
                                        </CardTitle>
                                        <Badge
                                            className={
                                                priorityColors[task.priority]
                                            }
                                        >
                                            {t(`home.${task.priority}`)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                        {task.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <Badge
                                            className={
                                                statusColors[task.status]
                                            }
                                        >
                                            {t(`home.${task.status}`)}
                                        </Badge>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage
                                                    src={"/placeholder.png"}
                                                    alt={task?.name}
                                                />
                                            </Avatar>
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {task?.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                                        <span>
                                            {task?.completed_at && (
                                                <span>
                                                    {t("home.completed")}:{" "}
                                                    {new Date(
                                                        task.completed_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            )}
                                        </span>
                                        <span>
                                            {t("home.created")}:{" "}
                                            {new Date(
                                                task.created_at
                                            ).toLocaleDateString("es-ES")}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-2 mt-4">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setCurrentPage((p) => Math.max(p - 1, 1))
                            }
                            disabled={currentPage === 1}
                        >
                            {t("home.previous")}
                        </Button>
                        <span className="text-sm">
                            {t("home.page")} {currentPage} / {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setCurrentPage((p) =>
                                    Math.min(p + 1, totalPages)
                                )
                            }
                            disabled={currentPage === totalPages}
                        >
                            {t("home.next")}
                        </Button>
                    </div>

                    {filteredTasks.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Calendar className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {t("home.noTasks")}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t("home.tryAdjustingFilters")}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
