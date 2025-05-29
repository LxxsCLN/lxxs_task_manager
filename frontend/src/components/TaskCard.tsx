import { deleteTask, updateTask } from "@/api/tasks";
import { ConfirmTaskForm } from "@/components/ConfirmTaskForm";
import { TaskForm } from "@/components/TaskForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAppData } from "@/contexts/AppDataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { CreateTask, Task } from "@/interfaces/tasks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const statusColors: { [key: string]: string } = {
    pending: "bg-gray-100 text-gray-800",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
};

const priorityColors: { [key: string]: string } = {
    low: "bg-gray-100 text-gray-600",
    medium: "bg-blue-100 text-blue-600",
    high: "bg-orange-100 text-orange-600",
    urgent: "bg-red-100 text-red-600",
};

export const TaskCard = ({ task }: { task: Task }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { setTasks } = useAppData();
    const { showLoader, hideLoader } = useLoading();
    const { user } = useAuth();

    const defaultValues = {
        title: task.title,
        description: task?.description || "",
        user_id: String(task.user_id),
        status: task.status,
        priority: task.priority,
    };

    const handleDelete = async () => {
        setOpen(false);
        showLoader();
        try {
            await deleteTask(task.id);
            setTasks((prev) => prev.filter((t) => t.id !== task.id));
            toast.success(t("editTaskModal.taskDeleted"));
        } catch (error) {
            toast.error(t("editTaskModal.taskDeleteError"));
        } finally {
            hideLoader();
        }
    };

    const handleEdit = async (values: CreateTask) => {
        setOpen(false);
        showLoader();

        try {
            const { data: updatedTask } = await updateTask({
                ...values,
                user_id: Number(values.user_id),
                id: task.id,
                notes: task.notes,
            });
            setTasks((prev) => {
                const index = prev.findIndex((t) => t.id === task.id);
                if (index !== -1) {
                    const newTasks: Task[] = [...prev];
                    newTasks[index] = updatedTask;
                    return newTasks;
                }
                return prev;
            });
            toast.success(t("editTaskModal.taskUpdated"));
        } catch (error) {
            toast.error(t("editTaskModal.taskUpdateError"));
        } finally {
            hideLoader();
        }
    };

    const handleUserEdit = async (values: any) => {
        setOpen(false);
        showLoader();

        try {
            const { data: updatedTask } = await updateTask({
                ...values,
                id: task.id,
                priority: task.priority,
                user_id: task.user_id,
                title: task.title,
                description: task.description,
            });
            setTasks((prev) => {
                const index = prev.findIndex((t) => t.id === task.id);
                if (index !== -1) {
                    const newTasks: Task[] = [...prev];
                    newTasks[index] = updatedTask;
                    return newTasks;
                }
                return prev;
            });
            toast.success(t("editTaskModal.taskUpdated"));
        } catch (error) {
            toast.error(t("editTaskModal.taskUpdateError"));
        } finally {
            hideLoader();
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Card className="cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-102 hover:shadow-md">
                    <CardHeader className="pb-3 h-[74px]">
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg line-clamp-2">
                                {task.title}
                            </CardTitle>
                            <Badge className={priorityColors[task.priority]}>
                                {t(`home.${task.priority}`)}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 min-h-[40px]">
                            {task.description}
                        </p>

                        <div className="flex items-center justify-between">
                            <Badge className={statusColors[task.status]}>
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
                                        ).toLocaleDateString("es-ES")}
                                    </span>
                                )}
                            </span>
                            <span>
                                {t("home.created")}:{" "}
                                {new Date(task.created_at).toLocaleDateString(
                                    "es-ES"
                                )}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </DialogTrigger>
            {task.status === "completed" ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t("confirmTaskModal.taskCompleted")}
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-1">
                        <div>{t("confirmTaskModal.notes")}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 border p-2 shadow-md rounded-md">
                            {task.notes || t("confirmTaskModal.noNotes")}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setOpen(false)}>
                            {t("confirmTaskModal.close")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            ) : user?.role === "admin" ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t("editTaskModal.modalTitle")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("editTaskModal.modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <TaskForm
                        defaultValues={defaultValues}
                        onSubmit={handleEdit}
                        handleDelete={handleDelete}
                        mode="edit"
                    />
                </DialogContent>
            ) : (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {t("editTaskModal.modalTitle")}
                        </DialogTitle>
                        <DialogDescription>
                            {t("editTaskModal.modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <ConfirmTaskForm task={task} onSubmit={handleUserEdit} />
                </DialogContent>
            )}
        </Dialog>
    );
};

export default TaskCard;
