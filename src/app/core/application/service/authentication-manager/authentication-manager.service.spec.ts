import { TestBed } from '@angular/core/testing';

import { AuthenticationManager } from './authentication-manager.service';

describe('AuthenticationService', () => {
  let service: AuthenticationManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
