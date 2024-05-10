import { TestBed } from '@angular/core/testing';

import { AuthorizationManager } from './authorization-manager.service';

describe('AuthorizationManager', () => {
  let service: AuthorizationManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
