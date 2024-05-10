import { Component, Input } from '@angular/core';
import { Team } from '../../../../core/model/team/team';
import { UserListComponent } from '../user-list/user-list.component';
import { UserFactoryComponent } from '../user-factory/user-factory.component';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-team-factory',
  standalone: true,
  imports: [UserListComponent, UserFactoryComponent, AccordionModule],
  templateUrl: './team-factory.component.html',
  styleUrl: './team-factory.component.css'
})
export class TeamFactoryComponent {
  @Input({ required: true }) public team!: Team;
  constructor() {}
}
