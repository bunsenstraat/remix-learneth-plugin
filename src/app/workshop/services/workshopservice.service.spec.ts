import { TestBed } from '@angular/core/testing';

import { WorkshopserviceService } from './workshopservice.service';

describe('WorkshopserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkshopserviceService = TestBed.get(WorkshopserviceService);
    expect(service).toBeTruthy();
  });
});
