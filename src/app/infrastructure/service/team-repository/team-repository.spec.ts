import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamRepository } from './team-repository';
import { ApiConstants } from '../../config/constant/api-constants';
import { HttpHeaders } from '@angular/common/http';
import { Team } from '../../../core/model/team/team';
import { RoleCode } from '../../../core/model/role/roleCode';
import { User } from '../../../core/model/user/user';

describe('TeamRepository', () => {
  let service: TeamRepository;
  let httpMock: HttpTestingController;

  const mockManager = new User({
    firstname: 'Nao',
    lastname: 'Fel',
    email: 'nao.fel@example.com',
    role: RoleCode.MANAGER
  });

  const mockMembers = [
    new User({
      firstname: 'Nao2',
      lastname: 'Fel2',
      email: 'nao.fel2@example.com',
      role: RoleCode.USER
    }),
    new User({
      firstname: 'Nao3',
      lastname: 'Fel3',
      email: 'nao.fel3@example.com',
      role: RoleCode.USER
    })
  ];

  const mockTeam = new Team({
    id: 1,
    manager: mockManager,
    members: mockMembers
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamRepository]
    });

    service = TestBed.inject(TeamRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifier que toutes les requêtes HTTP ont été traitées
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return a list of all teams', () => {
      service.getAll().subscribe((teams) => {
        expect(teams).toEqual([mockTeam]);
      });

      const req = httpMock.expectOne(ApiConstants.BASE_URL + ApiConstants.TEAM_GET_ALL);
      expect(req.request.method).toBe('GET');
      req.flush([mockTeam]);
    });
  });

  describe('addMember', () => {
    it('should add a member to the team', () => {
      service.addMember(mockManager.email, mockMembers[0].email).subscribe((team) => {
        expect(team).toEqual(mockTeam);
      });

      const req = httpMock.expectOne(
        `${ApiConstants.BASE_URL + ApiConstants.TEAM}/${mockManager.email}/members/${mockMembers[0].email}`
      );
      expect(req.request.method).toBe('PATCH');
      req.flush(mockTeam);
    });
  });

  describe('removeMember', () => {
    it('should remove a member from the team', () => {
      service.removeMember(mockManager.email, mockMembers[0].email).subscribe((team) => {
        expect(team).toEqual(mockTeam);
      });

      const req = httpMock.expectOne(
        `${ApiConstants.BASE_URL + ApiConstants.TEAM}/${mockManager.email}/members/${mockMembers[0].email}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(mockTeam);
    });
  });

  describe('createTeam', () => {
    it('should create a new team', () => {
      service.createTeam(mockManager.email).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${ApiConstants.BASE_URL + ApiConstants.TEAM_CREATE}/${mockManager.email}`);
      expect(req.request.method).toBe('POST');
      req.flush(null);
    });
  });

  describe('deleteTeam', () => {
    it('should delete a team', () => {
      service.deleteTeam(mockManager.email).subscribe((response) => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne(`${ApiConstants.BASE_URL + ApiConstants.TEAM_DELETE}/${mockManager.email}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
