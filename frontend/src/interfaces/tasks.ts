export interface Task {
    id: number;
    title: string;
    description: string | null;
    user_id: number;
    status: string;
    priority: string;
    created_at: Date;
    completed_at: Date;
    name: string;
    notes: string | null;
}

export interface CreateTask {
    title: string;
    description?: string | undefined;
    user_id: string;
    status: string;
    priority: string;
}

export interface TaskFilters {
    searchTerm: string;
    statusFilter: string;
    priorityFilter: string;
    userFilter: string;
}
