import { TestBed } from '@angular/core/testing';

import { ShapeGeneratorService } from './shape-generator.service';

describe('LineGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShapeGeneratorService = TestBed.get(ShapeGeneratorService);
    expect(service).toBeTruthy();
  });
});
