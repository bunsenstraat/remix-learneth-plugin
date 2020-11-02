import { TestBed } from '@angular/core/testing';

import { PlugintesterserviceService } from './plugintesterservice.service';

describe('PlugintesterserviceService', () => {
  let service: PlugintesterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlugintesterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
