import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpCardComponent } from './top-up-card.component';

describe('TopUpCardComponent', () => {
  let component: TopUpCardComponent;
  let fixture: ComponentFixture<TopUpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
