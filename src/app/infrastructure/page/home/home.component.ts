import { Component, Inject, OnInit } from '@angular/core';
import { TEAM_REFERENTIEL_SERVICE_TOKEN } from '../../config/injection-token/injection-token';
import { ITeamReferentielService } from '../../../core/application/service/referentiel/iteam-referentiel.service';
import { Team } from '../../../core/model/team/team';
import { TeamComponent } from './team/team.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { AuthenticationManager } from '../../../core/application/service/authentication-manager/authentication-manager.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewTeamComponent } from '../../home/new-team/new-team.component';
import { User } from '../../../core/model/user/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TeamComponent, SpeedDialModule],
  templateUrl: './home.component.html',
  providers: [DialogService],
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public teams: Team[] = [];
  public options: any[] = [];
  private _ref: DynamicDialogRef | undefined;
  
  constructor(
    @Inject(TEAM_REFERENTIEL_SERVICE_TOKEN) private _teamReferentielService: ITeamReferentielService,
    private _authenticationManager: AuthenticationManager,
    private _dialogService: DialogService,
  ) {
    this.options = [
      {
        icon: 'pi pi-sign-out',
        tooltipOptions: { tooltipLabel: "Déconnexion" },
        command: () => {
          _authenticationManager.logout();
        }
      },
      {
        icon: 'pi pi-plus',
        tooltipOptions: { tooltipLabel: "Nouvelle équipe" },
        command: () => {
          this.newTeam();
        }
      },
      {
        icon: 'pi pi-refresh',
        tooltipOptions: { tooltipLabel:"Rafraichir" },
        command: async () => { await this._teamReferentielService.loadTeams() }
      },
    ];
  }

  public async ngOnInit() {
    await this.loadTeam();
  }

  public async loadTeam() {
    this.teams = await this._teamReferentielService.loadTeams();
  }

  public async createTeam(manager: User): Promise<void> {
    await this._teamReferentielService.createTeam(manager.email);
  }

  public newTeam(): void {
    this._ref = this._dialogService.open(
      NewTeamComponent, {
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
}
