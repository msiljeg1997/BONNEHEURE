import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KongresRadionicaComponent } from './kongres-radionica.component';

describe('KongresRadionicaComponent', () => {
  let component: KongresRadionicaComponent;
  let fixture: ComponentFixture<KongresRadionicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KongresRadionicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KongresRadionicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
