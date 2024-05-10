import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamFactoryComponent } from './team-factory.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFactoryComponent } from '../user-factory/user-factory.component';
import { AccordionModule } from 'primeng/accordion';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';
import { IAuthorizationManager } from '../../../../core/application/repository/iauthorization-manager';
import { ButtonModule } from 'primeng/button';
import { ITeamService } from '../../../../core/application/service/service/iteam.service';
import { RoleCode } from '../../../../core/model/role/roleCode';
import { Team } from '../../../../core/model/team/team';
import { User } from '../../../../core/model/user/user';
import { of } from 'rxjs';

describe('TeamFactoryComponent', () => {
  let component: TeamFactoryComponent;
  let fixture: ComponentFixture<TeamFactoryComponent>;
  let authorizationManagerMock: jasmine.SpyObj<IAuthorizationManager>;
  let teamServiceMock: jasmine.SpyObj<ITeamService>;

  const mockUser: User = {
    firstname: 'Nao',
    lastname: 'Fel',
    email: 'nao.fel@example.com',
    role: RoleCode.MANAGER
  };

  const mockTeam: Team = {
    id: 1,
    manager: mockUser,
    members: []
  };

  beforeEach(async () => {
    authorizationManagerMock = jasmine.createSpyObj('IAuthorizationManager', ['canDeleteTeam']);
    authorizationManagerMock.canDeleteTeam.and.returnValue(true);

    teamServiceMock = jasmine.createSpyObj('ITeamService', ['deleteTeam']);

    await TestBed.configureTestingModule({
      imports: [TeamFactoryComponent, UserListComponent, UserFactoryComponent, AccordionModule, ButtonModule],
      providers: [
        { provide: AUTHORIZATION_MANAGER_TOKEN, useValue: authorizationManagerMock },
        { provide: TEAM_SERVICE_TOKEN, useValue: teamServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamFactoryComponent);
    component = fixture.componentInstance;
    component.team = mockTeam;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize canDeleteTeam correctly', () => {
    expect(component.canDeleteTeam).toBeTrue();
  });

  it('should call deleteTeam method of team service when deleteTeam is called', () => {
    component.deleteTeam();
    expect(teamServiceMock.deleteTeam).toHaveBeenCalledWith(mockUser.email);
  });
});
