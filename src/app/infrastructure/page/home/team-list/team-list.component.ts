import { Component, Input } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { AccordionModule } from 'primeng/accordion';
import { UserListComponent } from '../user-list/user-list.component';
import { TeamFactoryComponent } from '../team-factory/team-factory.component';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [AccordionModule, UserListComponent, TeamFactoryComponent],
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {
  @Input() teams: Team[] = [];

  public constructor() {}
}
