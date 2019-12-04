import { TestBed } from '@angular/core/testing';

import { LineGeneratorService } from './line-generator.service';

describe('LineGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineGeneratorService = TestBed.get(LineGeneratorService);
    expect(service).toBeTruthy();
  });
});
