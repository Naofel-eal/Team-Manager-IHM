import { User } from "../../../model/user/user";

export interface IUserService {
    createUser(firstname: string, lastname: string, email: string, password: string): Promise<void>;
    loadFreeUsers(): Promise<User[]>;
    deleteUser(email: string): Promise<void>;
}