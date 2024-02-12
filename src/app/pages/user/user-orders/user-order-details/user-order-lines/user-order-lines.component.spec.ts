import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderLinesComponent } from './user-order-lines.component';

describe('UserOrderLinesComponent', () => {
  let component: UserOrderLinesComponent;
  let fixture: ComponentFixture<UserOrderLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
