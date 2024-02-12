import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KongresPredavacFormComponent } from './kongres-predavac-form.component';

describe('KongresPredavacFormComponent', () => {
  let component: KongresPredavacFormComponent;
  let fixture: ComponentFixture<KongresPredavacFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KongresPredavacFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KongresPredavacFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
