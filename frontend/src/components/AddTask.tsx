import { TaskForm } from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAppData } from "@/contexts/AppDataContext";
import { useLoading } from "@/contexts/LoadingContext";
import { CreateTask } from "@/interfaces/tasks";
import { AxiosResponse } from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { createTask } from "../api/tasks";

export function AddTaskModal() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { setTasks } = useAppData();
    const { showLoader, hideLoader } = useLoading();

    const defaultValues = {
        title: "",
        description: "",
        user_id: "",
        status: "pending",
        priority: "low",
    };

    async function onSubmit(values: CreateTask) {
        setOpen(false);
        showLoader();
        try {
            const res: AxiosResponse = await createTask({
                ...values,
                user_id: Number(values.user_id),
            });

            const data = await res.data;
            toast.success(t("addTaskModal.taskCreated"));
            setTasks((prev) => [data, ...prev]);
        } catch (err) {
            toast.error(t("addTaskModal.networkError"));
        } finally {
            hideLoader();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {t("home.newTask")}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("addTaskModal.modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("addTaskModal.modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <TaskForm
                    defaultValues={defaultValues}
                    onSubmit={onSubmit}
                    mode="add"
                />
            </DialogContent>
        </Dialog>
    );
}
