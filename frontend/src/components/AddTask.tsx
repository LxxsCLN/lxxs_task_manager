import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CreateTask } from "@/interfaces/tasks";
import { AxiosResponse } from "axios";
import { t } from "i18next";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createTask } from "../api/tasks";
export function AddTaskModal({ users }: any) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState<string>();
    const [priority, setPriority] = useState("low");
    const [status, setStatus] = useState("pending");
    const [errors, setErrors] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            setTitle("");
            setDescription("");
            setUserId(undefined);
            setPriority("low");
            setStatus("pending");
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !userId) {
            setErrors(t("addTaskModal.titleUserError"));
            return;
        }

        try {
            const body: CreateTask = {
                title,
                description,
                user_id: userId,
                taskStatus: "pending",
                priority: "low",
            };

            const res: AxiosResponse = await createTask(body);

            const data = await res.data;

            if (res.statusText !== "OK") {
                setErrors(data.error || t("addTaskModal.genericError"));
            } else {
                setErrors(null);
                setTitle("");
                setDescription("");
                setUserId(undefined);
                setOpen(false);
            }
        } catch (err) {
            setErrors(t("addTaskModal.networkError"));
        }
    };

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
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {errors && <p className="text-red-500">{errors}</p>}
                    <input
                        type="text"
                        placeholder={t("addTaskModal.taskTitle")}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        placeholder={t("addTaskModal.description")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                            {t("home.assignedUser")}
                        </label>
                        <Select value={userId} onValueChange={setUserId}>
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    placeholder={t("addTaskModal.selectUser")}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user: any) => (
                                    <SelectItem
                                        key={user.id}
                                        value={String(user.id)}
                                    >
                                        {user.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                            {t("home.status")}
                        </label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t("home.all")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">
                                    {t("home.pending")}
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
                        <Select value={priority} onValueChange={setPriority}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t("home.all2")} />
                            </SelectTrigger>
                            <SelectContent>
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
                    <Button type="submit">{t("addTaskModal.save")}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
