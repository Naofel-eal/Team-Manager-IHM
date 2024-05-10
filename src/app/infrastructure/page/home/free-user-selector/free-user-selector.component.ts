import { Component, Inject, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IUserService } from '../../../../core/application/service/service/iuser.service';
import { User } from '../../../../core/model/user/user';
import { USER_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';

@Component({
  selector: 'app-free-user-selector',
  standalone: true,
  imports: [DropdownModule, FormsModule, ButtonModule],
  templateUrl: './free-user-selector.component.html',
  styleUrl: './free-user-selector.component.css'
})
export class FreeUserSelector implements OnInit{
  public freeUsers: User[] = [];
  public freeUserSelected!: User;

  constructor(
    @Inject(USER_SERVICE_TOKEN) private _userService: IUserService,
    private _ref: DynamicDialogRef, 
    private _messageService: MessageService
  ) {}
  
  public async ngOnInit(): Promise<void> {
    this.freeUsers = await this._userService.loadFreeUsers();
  }

  public selectUser(): void {
    if (this.freeUserSelected) 
      this._ref.close(this.freeUserSelected ?? null);
    else
      this._messageService.add({severity:'error', summary:'Error', detail: 'Veuillez sélectionner un utilisateur'});
  }
}
