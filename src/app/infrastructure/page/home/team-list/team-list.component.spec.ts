import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let authorizationManagerMock: jasmine.SpyObj<IAuthorizationManager>;
  let teamServiceMock: jasmine.SpyObj<ITeamService>;

  beforeEach(async () => {
    authorizationManagerMock = jasmine.createSpyObj('IAuthorizationManager', ['canDeleteTeam', 'canRemoveMemberFromTeam', 'canAddMemberToTeam', 'canEditTeam', 'canCreateTeam', 'canDeleteUser']);
    teamServiceMock = jasmine.createSpyObj('ITeamService', ['deleteTeam',]);
    await TestBed.configureTestingModule({
      imports: [TeamListComponent],
      providers: [
        { provide: AUTHORIZATION_MANAGER_TOKEN, useValue: authorizationManagerMock },
        { provide: TEAM_SERVICE_TOKEN, useValue: teamServiceMock }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
