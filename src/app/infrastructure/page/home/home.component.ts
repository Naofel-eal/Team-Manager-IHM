import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AUTHORIZATION_MANAGER_TOKEN, TEAM_SERVICE_TOKEN } from '../../config/injection-token/injection-token';
import { ITeamService } from '../../../core/application/service/service/iteam.service';
import { Team } from '../../../core/model/team/team';
import { TeamFactoryComponent } from './team-factory/team-factory.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { AuthenticationManager } from '../../../core/application/service/authentication-manager/authentication-manager.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User } from '../../../core/model/user/user';
import {AccordionModule} from 'primeng/accordion';
import { IAuthorizationManager } from '../../../core/application/repository/iauthorization-manager';
import { TeamListComponent } from './team-list/team-list.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FreeUserSelector } from './free-user-selector/free-user-selector.component';
import { RegisterFormComponent } from '../../shared/register-form/register-form.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamFactoryComponent, SpeedDialModule, AccordionModule, TeamListComponent],
  templateUrl: './home.component.html',
  providers: [DialogService],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  public loggedUser: User | undefined;
  public teams: Team[] = [];
  public options: any[] = [];
  private _ref: DynamicDialogRef | undefined;
  private teamsSubscription: Subscription | null = null;
  private destroy$ = new Subject<void>();

  
  constructor(
    @Inject(TEAM_SERVICE_TOKEN) private _teamService: ITeamService,
    @Inject(AUTHORIZATION_MANAGER_TOKEN) private _authorizationManager: IAuthorizationManager,
    private _authenticationManager: AuthenticationManager,
    private _dialogService: DialogService,
    private _messageService: MessageService,
  ) {
    this.loggedUser = _authenticationManager.authentication?.user;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async ngOnInit() {
    this.initOptions();
    this.teamsSubscription = this._teamService.teamsUpdated$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (teams: Team[]) => {
            this.teams = teams;
        }
    );

    await this.loadTeam();
  }

  public initOptions(): void {
    this.options = [
      {
        icon: 'pi pi-sign-out',
        tooltipOptions: { tooltipLabel: "Déconnexion" },
        command: () => {
          this._authenticationManager.logout();
        }
      },
      {
        icon: 'pi pi-refresh',
        tooltipOptions: { tooltipLabel:"Rafraichir" },
        command: async () => { this.teams = await this._teamService.loadTeams() }
      },
    ];

    if (this._authorizationManager.canCreateTeam()) {
      this.options.push({
        icon: 'pi pi-plus',
        tooltipOptions: { tooltipLabel: "Nouvelle équipe" },
        command: () => { this.newTeam() }
      });

      if (this._authorizationManager.canCreateUser()) {
        this.options.push({
          icon: 'pi pi-user-plus',
          tooltipOptions: { tooltipLabel: "Nouvel utilisateur" },
          command: () => { this.newUser() }
        });
    }
    }
  }
  
  public async loadTeam() {
    this.teams = await this._teamService.loadTeams();
  }

  public async createTeam(manager: User): Promise<void> {
    await this._teamService.createTeam(manager.email);
  }

  public newTeam(): void {
    this._ref = this._dialogService.open(
      FreeUserSelector, {
        header: "Nouvelle équipe",
        width: '50vw',
        height: '50vh',
        contentStyle: {"overflow": "auto"}
    });
    this._ref.onClose.subscribe(async (newManager) => {
      if (newManager) {
        await this.createTeam(newManager);
        this.loadTeam();
      }
    });
  }

  public newUser(): void {
    this._ref = this._dialogService.open(
      RegisterFormComponent, {
        header: "Nouvel utilisateur",
        width: '50%',
        height: '80%',
        contentStyle: {
          "display": "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
          "overflow": "auto",
        }
    });
    this._ref.onClose.subscribe((hasCreatedUser) => {
      if (hasCreatedUser)
        this._messageService.add({severity:'success', summary:'Succès', detail: 'Utilisateur créé avec succès'});
    });
  }
}
