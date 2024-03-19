import { TestBed } from '@angular/core/testing';

import { DateTransformServiceService } from './date-transform-service.service';

describe('DateTransformServiceService', () => {
  let service: DateTransformServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTransformServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
