import { TestBed } from '@angular/core/testing';

import { PersonalInfoShareService } from './personal-info-share.service';

describe('PersonalInfoShareService', () => {
  let service: PersonalInfoShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalInfoShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
