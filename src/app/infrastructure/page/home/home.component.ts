import { Component, Inject, OnInit } from '@angular/core';
import { TEAM_REPOSITORY_TOKEN } from '../../config/injection-token/injection-token';
import { ITeamRepository } from '../../../core/application/repository/iteam-respository';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  constructor(@Inject(TEAM_REPOSITORY_TOKEN) private _teamRepository: ITeamRepository) {}

  ngOnInit() {
    
  }
}
