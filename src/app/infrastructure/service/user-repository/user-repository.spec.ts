import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRepository } from './user-repository.service';
import { ApiConstants } from '../../config/constant/api-constants';
import { RoleCode } from '../../../core/model/role/roleCode';
import { User } from '../../../core/model/user/user';

describe('UserRepository', () => {
  let service: UserRepository;
  let httpMock: HttpTestingController;

  const mockFreeUsers: User[] = [
    {
      firstname: 'Nao2',
      lastname: 'Fel2',
      email: 'nao.fel2@example.com',
      role: RoleCode.USER
    },
    {
      firstname: 'Nao3',
      lastname: 'Fel3',
      email: 'nao.fel3@example.com',
      role: RoleCode.USER
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepository]
    });

    service = TestBed.inject(UserRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFreeUsers', () => {
    it('should return a list of free users', () => {
      const mockResponse = {
        freeUsers: mockFreeUsers
      };

      service.getFreeUsers().subscribe(res => {
        expect(res.freeUsers).toEqual(mockFreeUsers);
      });

      const req = httpMock.expectOne(ApiConstants.BASE_URL + ApiConstants.USER_FREE);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('createUser', () => {
    it('should create a user', () => {
      const newUser = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        password: 'password'
      };

      service.createUser(newUser.firstname, newUser.lastname, newUser.email, newUser.password).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(ApiConstants.BASE_URL + ApiConstants.USER);
      expect(req.request.method).toBe('POST');
      req.flush(null);
    });
  });

  describe('deleteUser', () => {
    it('should throw an error because it is not implemented', () => {
      expect(() => service.deleteUser('john.doe@example.com')).toThrowError('Method not implemented.');
    });
  });
});
