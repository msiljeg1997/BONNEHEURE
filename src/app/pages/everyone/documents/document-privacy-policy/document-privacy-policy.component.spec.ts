import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPrivacyPolicyComponent } from './document-privacy-policy.component';

describe('DocumentPrivacyPolicyComponent', () => {
  let component: DocumentPrivacyPolicyComponent;
  let fixture: ComponentFixture<DocumentPrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentPrivacyPolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentPrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
