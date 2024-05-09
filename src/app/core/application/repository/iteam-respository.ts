import { Observable } from "rxjs";
import { Team } from "../../model/team/team";

export interface ITeamRepository {
    getAll(): Observable<any>;
    addMember(managerEmail: string, memberEmail: string): Observable<Team>
    removeMember(managerEmail: string, memberEmail: string): Observable<Team>;
    createTeam(futureManagerEmail: string): Observable<void>;
    deleteTeam(futureManagerEmail: string): Observable<void>;
}