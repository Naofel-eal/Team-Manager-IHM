import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFactoryComponent } from './user-factory.component';

describe('UserComponent', () => {
  let component: UserFactoryComponent;
  let fixture: ComponentFixture<UserFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFactoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
