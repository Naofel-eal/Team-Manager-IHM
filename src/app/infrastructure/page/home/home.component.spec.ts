import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TeamFactoryComponent } from './team-factory/team-factory.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccordionModule } from 'primeng/accordion';
import { TeamListComponent } from './team-list/team-list.component';
import { AuthenticationManager } from '../../../core/application/service/authentication-manager/authentication-manager.service';
import { IAuthorizationManager } from '../../../core/application/repository/iauthorization-manager';
import { ITeamService } from '../../../core/application/service/service/iteam.service';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN } from '../../config/injection-token/injection-token';
import { of, Subject } from 'rxjs';
import { User } from '../../../core/model/user/user';
import { RoleCode } from '../../../core/model/role/roleCode';
import { Team } from '../../../core/model/team/team';
import { NewTeamComponent } from '../../home/new-team/new-team.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authenticationManagerMock: jasmine.SpyObj<AuthenticationManager>;
  let authorizationManagerMock: jasmine.SpyObj<IAuthorizationManager>;
  let teamServiceMock: jasmine.SpyObj<ITeamService>;
  let dialogServiceMock: jasmine.SpyObj<DialogService>;
  let dialogRefMock: jasmine.SpyObj<DynamicDialogRef>;

  const mockUser: User = {
    firstname: 'Nao',
    lastname: 'Fel',
    email: 'nao.fel@example.com',
    role: RoleCode.MANAGER
  };

  const mockTeams: Team[] = [
    {
      id: 1,
      manager: mockUser,
      members: []
    }
  ];

  beforeEach(async () => {
    authenticationManagerMock = jasmine.createSpyObj('AuthenticationManager', ['logout'], {
      authentication: { user: mockUser }
    });

    authorizationManagerMock = jasmine.createSpyObj('IAuthorizationManager', ['canCreateTeam'], {
      canCreateTeam: () => true
    });

    teamServiceMock = jasmine.createSpyObj('ITeamService', ['loadTeams', 'createTeam'], {
      teamsUpdated$: new Subject<Team[]>()
    });

    teamServiceMock.loadTeams.and.returnValue(Promise.resolve(mockTeams));
    dialogRefMock = jasmine.createSpyObj('DynamicDialogRef', ['onClose'], {
      onClose: of(mockUser)
    });
    dialogServiceMock = jasmine.createSpyObj('DialogService', ['open']);
    dialogServiceMock.open.and.returnValue(dialogRefMock);

    await TestBed.configureTestingModule({
      imports: [TeamFactoryComponent, SpeedDialModule, AccordionModule, TeamListComponent, HomeComponent],
      providers: [
        { provide: AuthenticationManager, useValue: authenticationManagerMock },
        { provide: AUTHORIZATION_MANAGER_TOKEN, useValue: authorizationManagerMock },
        { provide: TEAM_SERVICE_TOKEN, useValue: teamServiceMock },
        { provide: DialogService, useValue: dialogServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the logged user from authentication manager', () => {
    expect(component.loggedUser).toEqual(mockUser);
  });

  it('should load teams on init', async () => {
    await component.ngOnInit();
    expect(component.teams).toEqual(mockTeams);
  });

  it('should call logout command from authentication manager', () => {
    component.options[0].command();
    expect(authenticationManagerMock.logout).toHaveBeenCalled();
  });

  it('should refresh teams on refresh command', async () => {
    component.options[1].command();
    expect(component.teams).toEqual(mockTeams);
  });
  
  it('should create a team and refresh teams when a new manager is selected', async () => {
    await component.createTeam(mockUser);
    expect(teamServiceMock.createTeam).toHaveBeenCalledWith(mockUser.email);
  });
});
