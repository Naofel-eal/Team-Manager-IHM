import { Component, Input } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFactoryComponent } from '../user-factory/user-factory.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [UserListComponent, UserFactoryComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  @Input({ required: true }) public team!: Team;
  constructor() {}
}
