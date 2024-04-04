import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodiOnlyComponent } from './proizvodi-only.component';

describe('ProizvodiOnlyComponent', () => {
  let component: ProizvodiOnlyComponent;
  let fixture: ComponentFixture<ProizvodiOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProizvodiOnlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProizvodiOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
