import { Observable } from "rxjs";
import { Authentication } from "../../model/auth/authentication";

export interface IAuthenticationClient {
    register(firstname: string, lastname: string, email: string, password: string): Observable<void>;
    login(email: string, password: string): Observable<Authentication>;
}