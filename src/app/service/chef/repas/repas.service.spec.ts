import { TestBed } from '@angular/core/testing';

import { RepasService } from './repas.service';

describe('ChefService', () => {
  let service: RepasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
