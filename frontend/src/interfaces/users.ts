export interface UserType {
    id: number;
    name: string;
    role: string;
}

export interface UserResponse {
    users: UserType[];
}
