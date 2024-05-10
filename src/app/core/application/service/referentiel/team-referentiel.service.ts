import { Inject, Injectable } from "@angular/core";
import { Team } from "../../../model/team/team";
import { ITeamService } from "./iteam-referentiel.service";
import { TEAM_REPOSITORY_TOKEN } from "../../../../infrastructure/config/injection-token/injection-token";
import { ITeamRepository } from "../../repository/iteam-respository";
import { lastValueFrom, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TeamService implements ITeamService {
    private _teams: Team[] = [];

    public constructor(
        @Inject(TEAM_REPOSITORY_TOKEN) private _teamRepository: ITeamRepository
    ) {}

    public async addMemberToTeam(managerEmail: string, memberEmail: string): Promise<void> {
        const newTeam = await lastValueFrom(this._teamRepository.addMember(managerEmail, memberEmail));
    
        const index = this._teams.findIndex(team => team.id === newTeam.id);
        if (index !== -1) {
          this._teams.splice(index, 1, newTeam);
        }
    }
    
    public async removeMemberFromTeam(managerEmail: string, memberEmail: string): Promise<void> {
        const newTeam = await lastValueFrom(this._teamRepository.removeMember(managerEmail, memberEmail));
    
        const index = this._teams.findIndex(team => team.id === newTeam.id);
        if (index !== -1) {
          this._teams.splice(index, 1, newTeam);
        }
    }

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