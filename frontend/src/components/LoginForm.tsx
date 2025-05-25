import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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

export const LoginForm = ({ onSubmit }: any) => {
    const { t } = useTranslation();

    const loginFormSchema = z.object({
        username: z
            .string()
            .min(3, {
                message: t("landing.min_username"),
            })
            .max(50, {
                message: t("landing.max_username"),
            }),
        password: z
            .string()
            .min(6, {
                message: t("landing.min_password"),
            })
            .max(50, {
                message: t("landing.max_password"),
            }),
    });

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("landing.username")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("landing.enterUsername")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("landing.password")}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={t("landing.enterPassword")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter>
                    <Button type="submit">{t(`landing.submit_login`)}</Button>
                </CardFooter>
            </form>
        </Form>
    );
};
