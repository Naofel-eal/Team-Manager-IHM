import { Team } from "../../../model/team/team";

export interface ITeamService {
    loadTeams(): Promise<Team[]>;
    getTeams(): Team[];
    getTeamById(id: number): Team | null;
    getTeamByManagerEmail(managerEmail: string): Team | null;
    createTeam(managerEmail: string): Promise<void>;
    addMemberToTeam(managerEmail: string, memberEmail: string): Promise<void>;
    removeMemberFromTeam(managerEmail: string, memberEmail: string): Promise<void>;
}