import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFactoryComponent } from './user-factory.component';
import { Team } from '../../../../core/model/team/team';
import { RoleCode } from '../../../../core/model/role/roleCode';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';
import { IUserService } from '../../../../core/application/service/service/iuser.service';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN, USER_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';

describe('UserFactoryComponent', () => {
  let component: UserFactoryComponent;
  let fixture: ComponentFixture<UserFactoryComponent>;
  let authorizationManagerMock: jasmine.SpyObj<IAuthorizationManager>;
  let teamServiceMock: jasmine.SpyObj<ITeamService>;
  let userServiceMock: jasmine.SpyObj<IUserService>;
  let teamMock: Team = {
    id: 0,
    manager: {
      firstname: 'Nao',
      lastname: 'Fel',
      email: 'nao.fel@example.com',
      role: RoleCode.MANAGER
    },
    members: [
      {
        firstname: 'Nao2',
        lastname: 'Fel2',
        email: 'nao.fel2@example.com',
        role: RoleCode.USER
      },
      {
        firstname: 'Nao3',
        lastname: 'Fel3',
        email: 'nao.fel3@example.com',
        role: RoleCode.USER
      },
    ]
  
  };
  let userMock = teamMock.members[0];

  beforeEach(async () => {
    authorizationManagerMock = jasmine.createSpyObj<IAuthorizationManager>('IAuthorizationManager', ['canRemoveMemberFromTeam', 'canDeleteUser']);
    teamServiceMock = jasmine.createSpyObj<ITeamService>('ITeamService', ['removeMemberFromTeam']);
    userServiceMock = jasmine.createSpyObj<IUserService>('IUserService', ['deleteUser']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: AUTHORIZATION_MANAGER_TOKEN, useValue: authorizationManagerMock },
        { provide: TEAM_SERVICE_TOKEN, useValue: teamServiceMock },
        { provide: USER_SERVICE_TOKEN, useValue: userServiceMock }
      ],
      imports: [UserFactoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFactoryComponent);
    component = fixture.componentInstance;
    component.team = teamMock;
    component.user = userMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
