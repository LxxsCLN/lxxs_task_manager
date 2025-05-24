import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1),
    user_id: z.string().min(1),
    description: z.string().optional(),
    taskStatus: z.string().default("pending"),
    priority: z.string().default("low"),
});
