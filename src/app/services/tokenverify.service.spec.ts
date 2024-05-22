import { TestBed } from '@angular/core/testing';

import { TokenverifyService } from './tokenverify.service';

describe('TokenverifyService', () => {
  let service: TokenverifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenverifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
