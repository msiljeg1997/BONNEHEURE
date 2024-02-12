import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentComplaintsComponent } from './document-complaints.component';

describe('DocumentComplaintsComponent', () => {
  let component: DocumentComplaintsComponent;
  let fixture: ComponentFixture<DocumentComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentComplaintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
