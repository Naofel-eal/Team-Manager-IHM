import { Team } from "../../../model/team/team";

export interface ITeamReferentielService {
    loadTeams(): void;
    getTeams(): Team[];
    getTeam(id: number): Team | null;
}