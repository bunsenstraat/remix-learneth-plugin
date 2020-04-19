import { TestBed } from '@angular/core/testing';

import { MenuserviceService } from './menuservice.service';

describe('MenuserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuserviceService = TestBed.get(MenuserviceService);
    expect(service).toBeTruthy();
  });
});
