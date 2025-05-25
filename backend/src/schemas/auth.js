import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(6),
});

export const signupSchema = z
    .object({
        name: z.string().min(1).max(50),
        username: z.string().min(3).max(50),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        role: z.enum(["user", "admin"]).optional().default("user"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
