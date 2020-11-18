import { TestBed } from '@angular/core/testing';

import { GlobalerrorService } from './globalerror.service';

describe('GlobalerrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalerrorService = TestBed.get(GlobalerrorService);
    expect(service).toBeTruthy();
  });
});
