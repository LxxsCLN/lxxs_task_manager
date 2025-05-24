export interface Task {
    id: string;
    title: string;
    description: string | null;
    user_id: number;
    status: string;
    priority: string;
    created_at: Date;
    completed_at: Date;
    name: string;
}

export interface CreateTask {
    title: string;
    description: string | undefined;
    user_id: string;
    taskStatus: string;
    priority: string;
}
