import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeUserSelector } from './free-user-selector.component';
import { User } from '../../../../core/model/user/user';
import { RoleCode } from '../../../../core/model/role/roleCode';
import { IUserService } from '../../../../core/application/service/service/iuser.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { USER_SERVICE_TOKEN } from '../../../config/injection-token/injection-token';


describe('NewTeamComponent', () => {
  let component: FreeUserSelector;
  let fixture: ComponentFixture<FreeUserSelector>;
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
      imports: [FreeUserSelector],
      providers: [
        { provide: USER_SERVICE_TOKEN, useValue: userServiceMock },
        { provide: DynamicDialogRef, useValue: dynamicdialogRefMock },
        { provide: MessageService, useValue: messageServiceMock },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeUserSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
