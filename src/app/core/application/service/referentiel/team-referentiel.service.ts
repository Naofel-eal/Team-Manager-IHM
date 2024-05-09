import { Inject, Injectable } from "@angular/core";
import { Team } from "../../../model/team/team";
import { ITeamReferentielService } from "./iteam-referentiel.service";
import { TEAM_REPOSITORY_TOKEN } from "../../../../infrastructure/config/injection-token/injection-token";
import { ITeamRepository } from "../../repository/iteam-respository";

@Injectable({
    providedIn: 'root'
})
export class TeamReferentielService implements ITeamReferentielService {
    public constructor(@Inject(TEAM_REPOSITORY_TOKEN) private _teamRepository: ITeamRepository) {}

    public loadTeams(): void {
        throw new Error("Method not implemented.");
    }

    public getTeams(): Team[] {
        throw new Error("Method not implemented.");
    }

    public getTeam(id: number): Team | null {
        throw new Error("Method not implemented.");
    }
    
}