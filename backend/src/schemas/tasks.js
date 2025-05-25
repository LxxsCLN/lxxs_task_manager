import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().min(1),
    title: z.string().min(1),
    user_id: z.string().min(1),
    description: z.string().optional(),
    status: z.string().default("pending"),
    priority: z.string().default("low"),
});

export const completeTaskSchema = z.object({
    id: z.number().min(1),
    notes: z.string().optional().default(""),
});
