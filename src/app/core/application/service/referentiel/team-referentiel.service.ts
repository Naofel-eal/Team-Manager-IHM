import { Inject, Injectable } from "@angular/core";
import { Team } from "../../../model/team/team";
import { ITeamReferentielService } from "./iteam-referentiel.service";
import { TEAM_REPOSITORY_TOKEN } from "../../../../infrastructure/config/injection-token/injection-token";
import { ITeamRepository } from "../../repository/iteam-respository";
import { lastValueFrom, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TeamReferentielService implements ITeamReferentielService {
    private _teams: Team[] = [];

    public constructor(
        @Inject(TEAM_REPOSITORY_TOKEN) private _teamRepository: ITeamRepository
    ) {}

    public createTeam(managerEmail: string): Promise<void> {
        return lastValueFrom(this._teamRepository.createTeam(managerEmail));
    }

    public async loadTeams(): Promise<Team[]> {
        this._teams = await lastValueFrom(
            this._teamRepository.getAll().pipe(
                map((res) => res.teams))
            );
        return this._teams;
    }

    public getTeams(): Team[] {
        return this._teams;
    }

    public getTeamById(id: number): Team | null {
        return this._teams.find(team => team.id === id) || null;
    }

    public getTeamByManagerEmail(managerEmail: string): Team | null {
        return this._teams.find(team => team.manager.email === managerEmail) || null;
    }
    
}