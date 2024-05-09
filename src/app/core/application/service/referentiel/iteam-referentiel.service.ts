import { Team } from "../../../model/team/team";

export interface ITeamReferentielService {
    loadTeams(): Promise<Team[]>;
    getTeams(): Team[];
    getTeamById(id: number): Team | null;
    getTeamByManagerEmail(managerEmail: string): Team | null;
    createTeam(managerEmail: string): Promise<void>;
}