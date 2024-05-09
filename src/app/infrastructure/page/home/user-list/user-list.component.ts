import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserFactoryComponent } from '../user-factory/user-factory.component';
import { User } from '../../../../core/model/user/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFactoryComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input({required: true}) public users!: User[];

  constructor() {}

  ngOnInit(): void {}
}