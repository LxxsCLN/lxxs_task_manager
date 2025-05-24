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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateTask } from "@/interfaces/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";
import { createTask } from "../api/tasks";

export function AddTaskModal({ users }: any) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const formSchema = z.object({
        title: z
            .string({
                required_error: t("addTaskModal.requiredTitle"),
            })
            .min(3, {
                message: t("addTaskModal.titleError"),
            })
            .max(50, {
                message: t("addTaskModal.titleMaxError"),
            }),
        description: z
            .string()
            .max(200, {
                message: t("addTaskModal.descriptionMaxError"),
            })
            .optional(),
        userId: z
            .string({
                required_error: t("addTaskModal.userError"),
            })
            .min(1, {
                message: t("addTaskModal.userError"),
            }),
        status: z.enum(["pending", "in_progress", "completed"]),
        priority: z.enum(["low", "medium", "high", "urgent"]),
    });

    useEffect(() => {
        if (!open) {
            form.reset();
        }
    }, [open]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            userId: "",
            status: "pending",
            priority: "low",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { title, description, userId, status, priority } = values;
        try {
            const body: CreateTask = {
                title,
                description,
                user_id: userId,
                taskStatus: status,
                priority: priority,
            };

            const res: AxiosResponse = await createTask(body);

            const data = await res.data;

            if (res.statusText !== "OK") {
                toast.error(data.error || t("addTaskModal.genericError"));
            } else {
                setOpen(false);
                toast.success("Task has been created.");
                toast.success(t("addTaskModal.taskCreated"));
            }
        } catch (err) {
            toast.error(t("addTaskModal.networkError"));
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
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder={t(
                                                "addTaskModal.taskTitle"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder={t(
                                                "addTaskModal.description"
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {t("home.assignedUser")}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={t(
                                                        "addTaskModal.selectUser"
                                                    )}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("home.status")}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("home.priority")}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-end">
                            <Button type="submit">
                                {t("addTaskModal.save")}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
