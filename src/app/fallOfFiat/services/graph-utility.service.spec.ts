import { TestBed } from '@angular/core/testing';

import { GraphUtilityService } from './graph-utility.service';

describe('GraphUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphUtilityService = TestBed.get(GraphUtilityService);
    expect(service).toBeTruthy();
  });
});
