import { Team } from "../../model/team/team";

export interface IAuthorizationManager {
    canCreateTeam(): boolean;
    canDeleteTeam(): boolean;
    canAddMemberToTeam(team: Team): boolean;
    canRemoveMemberFromTeam(team: Team): boolean;
    canCreateUser(): boolean;
    canDeleteUser(): boolean;
}