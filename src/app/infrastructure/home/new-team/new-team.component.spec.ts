import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeamComponent } from './new-team.component';
import { User } from '../../../core/model/user/user';
import { RoleCode } from '../../../core/model/role/roleCode';
import { IUserService } from '../../../core/application/service/service/iuser.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { USER_SERVICE_TOKEN } from '../../config/injection-token/injection-token';

describe('NewTeamComponent', () => {
  let component: NewTeamComponent;
  let fixture: ComponentFixture<NewTeamComponent>;
  let freeUsersMock: User[] = [
    {
      firstname: 'Nao1',
      lastname: 'Fel1',
      email: 'nao.fel1@example.com',
      role: RoleCode.USER,
    },
    {
      firstname: 'Nao2',
      lastname: 'Fel2',
      email: 'nao.fel2@example.com',
      role: RoleCode.USER,
    },
  ];
  let freeUserSelectedMock: User = freeUsersMock[0];
  
  let userServiceMock: jasmine.SpyObj<IUserService>;
  let dynamicdialogRefMock: jasmine.SpyObj<DynamicDialogRef>;
  let messageServiceMock: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    userServiceMock = jasmine.createSpyObj<IUserService>('IUserService', ['loadFreeUsers']);
    dynamicdialogRefMock = jasmine.createSpyObj<DynamicDialogRef>('DynamicDialogRef', ['close']);
    messageServiceMock = jasmine.createSpyObj<MessageService>('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [NewTeamComponent],
      providers: [
        { provide: USER_SERVICE_TOKEN, useValue: userServiceMock },
        { provide: DynamicDialogRef, useValue: dynamicdialogRefMock },
        { provide: MessageService, useValue: messageServiceMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
