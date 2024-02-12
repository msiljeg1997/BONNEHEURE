import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KongresRadionicaFormComponent } from './kongres-radionica-form.component';

describe('KongresRadionicaFormComponent', () => {
  let component: KongresRadionicaFormComponent;
  let fixture: ComponentFixture<KongresRadionicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KongresRadionicaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KongresRadionicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
