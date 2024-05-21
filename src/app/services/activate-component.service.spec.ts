import { TestBed } from '@angular/core/testing';

import { ActivateComponentService } from './activate-component.service';

describe('ActivateComponentService', () => {
  let service: ActivateComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
