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

export const SignupForm = ({ onSubmit }: any) => {
    const { t } = useTranslation();

    const signUpFormSchema = z
        .object({
            name: z
                .string()
                .min(3, {
                    message: t("landing.min_name"),
                })
                .max(50, {
                    message: t("landing.max_name"),
                }),
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
            confirmPassword: z.string().min(6).max(50),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("landing.passwords_doNotMatch"),
            path: ["confirmPassword"],
        });

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            name: "",
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t("landing.name")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("landing.enterName")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {t("landing.confirmPassword")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder={t(
                                            "landing.enterPasswordAgain"
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit">{t(`landing.submit_signup`)}</Button>
                </CardFooter>
            </form>
        </Form>
    );
};
