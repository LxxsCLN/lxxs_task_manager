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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export const ConfirmTaskForm = ({ onSubmit }: any) => {
    const { t } = useTranslation();

    const confirmFormSchema = z.object({
        notes: z.string().optional(),
    });

    const form = useForm<z.infer<typeof confirmFormSchema>>({
        resolver: zodResolver(confirmFormSchema),
        defaultValues: {
            notes: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Button type="submit">
                        {t("confirmTaskModal.confirm")}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ConfirmTaskForm;
