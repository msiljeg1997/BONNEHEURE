import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KongresManagementComponent } from './kongres-management.component';

describe('KongresManagementComponent', () => {
  let component: KongresManagementComponent;
  let fixture: ComponentFixture<KongresManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KongresManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KongresManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
