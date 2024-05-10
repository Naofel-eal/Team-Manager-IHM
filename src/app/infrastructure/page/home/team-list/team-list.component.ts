import { Component, Inject, Input } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { AccordionModule } from 'primeng/accordion';
import { UserListComponent } from '../user-list/user-list.component';
import { TeamFactoryComponent } from '../team-factory/team-factory.component';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [AccordionModule, UserListComponent, TeamFactoryComponent, ButtonModule],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  @Input() teams: Team[] = [];
  public canDeleteTeam: boolean;

  public constructor(
    @Inject(AUTHORIZATION_MANAGER_TOKEN) private _authorizationManager: IAuthorizationManager,
    @Inject(TEAM_SERVICE_TOKEN) private _teamService: ITeamService
  ) {
    this.canDeleteTeam = this._authorizationManager.canDeleteTeam();
  }
  
  public deleteTeam(team: Team): void {
    this._teamService.deleteTeam(team.manager.email);
  }
}
