import { TestBed } from '@angular/core/testing';

import { FeedBackShareService } from './feed-back-share.service';

describe('FeedBackShareService', () => {
  let service: FeedBackShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedBackShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
