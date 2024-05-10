import { Component, Inject, Input, OnInit } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFactoryComponent } from '../user-factory/user-factory.component';
import { AccordionModule } from 'primeng/accordion';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_REFERENTIEL_SERVICE_TOKEN as TEAM_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ButtonModule } from 'primeng/button';
import { ITeamService } from '../../../../core/application/service/referentiel/iteam-referentiel.service';

@Component({
  selector: 'app-team-factory',
  standalone: true,
  imports: [UserListComponent, UserFactoryComponent, AccordionModule, ButtonModule],
  templateUrl: './team-factory.component.html',
  styleUrl: './team-factory.component.css'
})
export class TeamFactoryComponent implements OnInit {
  @Input({ required: true }) public team!: Team;
  public canDeleteTeam: boolean = false;

  constructor(
    @Inject(AUTHORIZATION_MANAGER_TOKEN) private _authorizationManager: IAuthorizationManager,
    @Inject(TEAM_SERVICE_TOKEN) private _teamService: ITeamService
  ) {}

  ngOnInit(): void {
    this.canDeleteTeam = this._authorizationManager.canDeleteTeam();
  }

  public deleteTeam(): void {
    this._teamService.deleteTeam(this.team.manager.email);
  }
}
