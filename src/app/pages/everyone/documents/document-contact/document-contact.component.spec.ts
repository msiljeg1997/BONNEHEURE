import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentContactComponent } from './document-contact.component';

describe('DocumentContactComponent', () => {
  let component: DocumentContactComponent;
  let fixture: ComponentFixture<DocumentContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
