import { TestBed } from '@angular/core/testing';

import { ReservedRoomsService } from './reserved-rooms.service';

describe('ReservedRoomsService', () => {
  let service: ReservedRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservedRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
