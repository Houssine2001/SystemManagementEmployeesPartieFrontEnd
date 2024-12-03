import { TestBed } from '@angular/core/testing';

import { HistoryEmployeeService } from './history-employee.service';

describe('HistoryEmployeeService', () => {
  let service: HistoryEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
