import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from '../../../../core/model/user/user';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Team } from '../../../../core/model/team/team';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN as TEAM_SERVICE_TOKEN, USER_SERVICE_TOKEN as USER_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';
import { IUserService } from '../../../../core/application/service/service/iuser.service';

@Component({
  selector: 'app-user-factory',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './user-factory.component.html',
  styleUrl: './user-factory.component.css'
})
export class UserFactoryComponent implements OnInit {
  @Input({ required: true }) public user!: User;
  @Input({ required: true }) public team!: Team;

  public canRemvoeMemberFromTeam: boolean = false;
  public canDeleteUser: boolean = false;

  constructor(
    @Inject(AUTHORIZATION_MANAGER_TOKEN) private _authorizationManager: IAuthorizationManager,
    @Inject(TEAM_SERVICE_TOKEN) private _teamService: ITeamService,
    @Inject(USER_SERVICE_TOKEN) private _userService: IUserService
  ) {}

  public ngOnInit() {
    this.canRemvoeMemberFromTeam = this._authorizationManager.canRemoveMemberFromTeam(this.team);
    this.canDeleteUser = this._authorizationManager.canDeleteUser();
  }

  public async removeMemberFromTeam() {
    await this._teamService.removeMemberFromTeam(this.team.manager.email, this.user.email);
  }

  public async deleteUser() {
    await this._userService.deleteUser(this.user.email);
  }
}
