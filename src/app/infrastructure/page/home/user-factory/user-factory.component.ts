import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../core/model/user/user';
import { RoleCode } from '../../../../core/model/role/roleCode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-factory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-factory.component.html',
  styleUrl: './user-factory.component.css'
})
export class UserFactoryComponent implements OnInit {
  @Input({ required: true }) public user!: User;

  isAdministrator: boolean = false;
  isManager: boolean = false;

  constructor() {}

  public ngOnInit() {
    switch (this.user.role) {
      case RoleCode.USER:
        console.log('I am a manager');
        break;
      case RoleCode.MANAGER:
        console.log('I am a member');
        break;
      case RoleCode.ADMIN:
        console.log('I am an admin');
        break;
      default:
        console.log('I am a user');
        break;
    }
  }
}
