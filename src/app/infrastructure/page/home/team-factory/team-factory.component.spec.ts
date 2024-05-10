import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFactoryComponent } from './team-factory.component';

describe('TeamComponent', () => {
  let component: TeamFactoryComponent;
  let fixture: ComponentFixture<TeamFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
