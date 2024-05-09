import { TestBed } from '@angular/core/testing';

import { TeamRepository } from './team-repository';

describe('TeamRepositoryClient', () => {
  let service: TeamRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
