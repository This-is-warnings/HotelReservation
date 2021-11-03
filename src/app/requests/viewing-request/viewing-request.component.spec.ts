import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewingRequestComponent } from './viewing-request.component';

describe('ViewingRequestComponent', () => {
  let component: ViewingRequestComponent;
  let fixture: ComponentFixture<ViewingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewingRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
