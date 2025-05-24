export interface Task {
    id: string;
    title: string;
    description: string | null;
    user_id: number;
    taskStatus: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTask {
    title: string;
    description: string | undefined;
    user_id: string;
    taskStatus: string;
    priority: string;
}
