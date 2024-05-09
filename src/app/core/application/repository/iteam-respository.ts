import { Observable } from "rxjs";

export interface ITeamRepository {
    getAll(): Observable<any>;
    addMember(managerEmail: string, memberEmail: string): Observable<any>
    removeMember(managerEmail: string, memberEmail: string): Observable<any>;
    createTeam(futureManagerEmail: string): Observable<any>;
    deleteTeam(futureManagerEmail: string): Observable<any>;
}