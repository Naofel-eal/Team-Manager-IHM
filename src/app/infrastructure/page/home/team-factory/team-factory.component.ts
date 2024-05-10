import { Component, Inject, Input, OnInit } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-team-factory',
  standalone: true,
  imports: [UserListComponent],
  templateUrl: './team-factory.component.html',
  styleUrl: './team-factory.component.css'
})
export class TeamFactoryComponent {
  @Input({ required: true }) public team!: Team;

  constructor() {}
}
