import { Component, Inject, OnInit } from '@angular/core';
import { USER_REFERENTIEL_SERVICE_TOKEN, USER_REPOSITORY_TOKEN } from '../../config/injection-token/injection-token';
import { User } from '../../../core/model/user/user';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IUserReferentielService } from '../../../core/application/service/referentiel/iuser-referentiel.service';

@Component({
  selector: 'app-new-team',
  standalone: true,
  imports: [DropdownModule, FormsModule, ButtonModule],
  templateUrl: './new-team.component.html',
  styleUrl: './new-team.component.css'
})
export class NewTeamComponent implements OnInit{
  public freeUsers: User[] = [];
  public freeUserSelected!: User;

  constructor(
    @Inject(USER_REFERENTIEL_SERVICE_TOKEN) private _userReferentiel: IUserReferentielService,
    private _ref: DynamicDialogRef, 
    private _messageService: MessageService
  ) {}
  
  public async ngOnInit(): Promise<void> {
    this.freeUsers = await this._userReferentiel.loadFreeUsers();
  }

  public createTeam(): void {
    if (this.freeUserSelected) 
      this._ref.close(this.freeUserSelected ?? null);
    else
      this._messageService.add({severity:'error', summary:'Error', detail: 'Veuillez sélectionner un utilisateur'});
  }
}
