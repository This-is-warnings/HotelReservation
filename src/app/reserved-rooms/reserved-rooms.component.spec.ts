import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedRoomsComponent } from './reserved-rooms.component';

describe('ReservedRoomsComponent', () => {
  let component: ReservedRoomsComponent;
  let fixture: ComponentFixture<ReservedRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
