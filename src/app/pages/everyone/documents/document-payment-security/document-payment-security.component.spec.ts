import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPaymentSecurityComponent } from './document-payment-security.component';

describe('DocumentPaymentSecurityComponent', () => {
  let component: DocumentPaymentSecurityComponent;
  let fixture: ComponentFixture<DocumentPaymentSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPaymentSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPaymentSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
