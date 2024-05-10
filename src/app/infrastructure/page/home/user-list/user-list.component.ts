import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { TableModule } from 'primeng/table';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN, USER_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';
import { IUserService } from '../../../../core/application/service/service/iuser.service';
import { User } from '../../../../core/model/user/user';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input({required: true}) public team!: Team;
  public canRemvoeMemberFromTeam: boolean = false;
  public canDeleteUser: boolean = false;

  constructor(
    @Inject(AUTHORIZATION_MANAGER_TOKEN) private _authorizationManager: IAuthorizationManager,
    @Inject(TEAM_SERVICE_TOKEN) private _teamService: ITeamService,
    @Inject(USER_SERVICE_TOKEN) private _userService: IUserService
  ) {}

  ngOnInit(): void {
    this.canRemvoeMemberFromTeam = this._authorizationManager.canRemoveMemberFromTeam(this.team);
    this.canDeleteUser = this._authorizationManager.canDeleteUser();
  }

  public async removeMemberFromTeam(member: User) {
    await this._teamService.removeMemberFromTeam(this.team.manager.email, member.email);
  }

  public async deleteUser(member: User) {
    this._userService.deleteUser(member.email).then(() => {
      this.team.members = this.team.members.filter(m => m.email !== member.email);
    });
  }
}