import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilters } from "@/components/TaskFilters";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/contexts/AppDataContext";
import { AlertCircle, Calendar, LoaderCircle, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [userFilter, setUserFilter] = useState<string>("all");
    const { tasks, loading } = useAppData();

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 6;

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesSearch =
                task?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (task?.description ?? "")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "all" || task.status === statusFilter;
            const matchesPriority =
                priorityFilter === "all" || task.priority === priorityFilter;
            const matchesUser =
                userFilter === "all" || `${task.user_id}` === userFilter;

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
        const in_progress = tasks.filter(
            (task) => task.status === "in_progress"
        ).length;
        const urgent = tasks.filter(
            (task) => task.priority === "urgent"
        ).length;

        return { total, completed, in_progress, urgent };
    }, [tasks]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 dark:bg-black">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <Header />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        label={t("home.totalTasks")}
                        value={taskStats.total}
                        icon={<Calendar className="h-4 w-4 text-blue-600" />}
                        bgColor="bg-blue-100"
                    />

                    <StatsCard
                        label={t("home.completed")}
                        value={taskStats.completed}
                        icon={<Calendar className="h-4 w-4 text-green-600" />}
                        bgColor="bg-green-100"
                    />

                    <StatsCard
                        label={t("home.in_progress")}
                        value={taskStats.in_progress}
                        icon={<User className="h-4 w-4 text-blue-600" />}
                        bgColor="bg-blue-100"
                    />

                    <StatsCard
                        label={t("home.multiUrgent")}
                        value={taskStats.urgent}
                        icon={<AlertCircle className="h-4 w-4 text-red-600" />}
                        bgColor="bg-red-100"
                    />
                </div>

                {/* Filters */}
                <TaskFilters />

                {/* Tasks Grid */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            {t("home.tasks")} ({filteredTasks.length})
                        </h2>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>

                    {loading && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <LoaderCircle className="h-10 w-10 mx-auto animate-spin" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                {t("home.loadingTasks")}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {t("home.pleaseWait")}
                            </p>
                        </div>
                    )}

                    {!loading && filteredTasks.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Calendar className="h-12 w-12 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-300 mb-2">
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
