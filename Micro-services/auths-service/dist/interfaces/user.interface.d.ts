export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    tokens: string[];
}
export interface IAuthUser {
    username: string;
    email: string;
    token: string;
}
