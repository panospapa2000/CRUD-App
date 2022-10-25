import { TestBed } from '@angular/core/testing';

import { AddToTableService } from './add-to-table.service';

describe('AddToTableService', () => {
  let service: AddToTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
