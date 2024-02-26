import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProizvodiNaslovnaComponent } from './proizvodi-naslovna.component';

describe('ProizvodiNaslovnaComponent', () => {
  let component: ProizvodiNaslovnaComponent;
  let fixture: ComponentFixture<ProizvodiNaslovnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProizvodiNaslovnaComponent]
    });
    fixture = TestBed.createComponent(ProizvodiNaslovnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
