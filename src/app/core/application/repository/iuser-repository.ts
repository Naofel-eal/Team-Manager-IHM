import { Observable } from "rxjs";

export interface IUserRepository {
    createUser(firstname: string, lastname: string, email: string, password: string): Observable<any>;
    deleteUser(userEmail: string): Observable<any>;
}