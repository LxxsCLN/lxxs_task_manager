import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
import { useAppData } from "@/contexts/AppDataContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

interface TaskFormProps {
    defaultValues: {
        title: string;
        description: string;
        user_id: string;
        status: any;
        priority: any;
    };
    onSubmit: (values: any) => Promise<void>;
    mode?: "add" | "edit";
    handleDelete?: () => Promise<void>;
}

export const TaskForm = ({
    defaultValues,
    onSubmit,
    mode = "add",
    handleDelete,
}: TaskFormProps) => {
    const { t } = useTranslation();
    const { users } = useAppData();
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
        user_id: z
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
        defaultValues,
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={t("addTaskModal.taskTitle")}
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
                                    placeholder={t("addTaskModal.description")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="user_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("home.assignedUser")}</FormLabel>
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
                                    {users?.map((user: any) => (
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

                {mode === "add" ? (
                    <div className="w-full flex justify-end">
                        <Button type="submit">{t("addTaskModal.save")}</Button>
                    </div>
                ) : (
                    <div className="w-full flex justify-between">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type="button" variant="destructive">
                                    {t("editTaskModal.delete")}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {t("editTaskModal.deleteConfirmation")}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t(
                                            "editTaskModal.deleteConfirmationDescription"
                                        )}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        {t(
                                            "editTaskModal.deleteConfirmationCancel"
                                        )}
                                    </AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>
                                        {t(
                                            "editTaskModal.deleteConfirmationAction"
                                        )}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button type="submit">{t("editTaskModal.save")}</Button>
                    </div>
                )}
            </form>
        </Form>
    );
};

export default TaskForm;
