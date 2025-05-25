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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const ConfirmTaskForm = ({ task, onSubmit }: any) => {
    const { t } = useTranslation();

    const confirmFormSchema = z.object({
        notes: z.string().optional(),
        status: z.enum(["pending", "in_progress", "completed"]),
    });

    const form = useForm<z.infer<typeof confirmFormSchema>>({
        resolver: zodResolver(confirmFormSchema),
        defaultValues: {
            notes: task?.notes || "",
            status: task?.status,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        {t("home.completed")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("confirmTaskModal.notes")}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t(
                                        "confirmTaskModal.enterNotes"
                                    )}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button type="submit">{t("editTaskModal.save")}</Button>
                </div>
            </form>
        </Form>
    );
};

export default ConfirmTaskForm;
