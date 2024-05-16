import { Component, Inject, Input } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { AccordionModule } from 'primeng/accordion';
import { UserListComponent } from '../user-list/user-list.component';
import { TeamFactoryComponent } from '../team-factory/team-factory.component';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FreeUserSelector } from '../free-user-selector/free-user-selector.component';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [AccordionModule, UserListComponent, TeamFactoryComponent, ButtonModule],
  providers: [DialogService],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  @Input() teams: Team[] = [];
  public canDeleteTeam: boolean;

  private _ref: DynamicDialogRef | undefined;

  public constructor(
    @Inject(AUTHORIZATION_MANAGER_TOKEN) private _authorizationManager: IAuthorizationManager,
    @Inject(TEAM_SERVICE_TOKEN) private _teamService: ITeamService,
    private _dialogService: DialogService,
  ) {
    this.canDeleteTeam = this._authorizationManager.canDeleteTeam();
  }

  public canAddMemberToTeam(team: Team): boolean {
    return this._authorizationManager.canAddMemberToTeam(team);
  }
  
  public deleteTeam(team: Team, event: Event): void {
    event.stopPropagation();
    this._teamService.deleteTeam(team.manager.email);
  }

  public addMemberToTeam(team: Team, event: Event): void {
    event.stopPropagation();
    this._ref = this._dialogService.open(
      FreeUserSelector, {
        header: "Nouvelle équipe",
        width: '50vw',
        height: '50vh',
        contentStyle: {"overflow": "auto"}
    });
    this._ref.onClose.subscribe(async (newMember) => {
      if (newMember) {
        await this._teamService.addMemberToTeam(team.manager.email, newMember.email);
        team.members.push(newMember);     
      }
    });
  }
}
