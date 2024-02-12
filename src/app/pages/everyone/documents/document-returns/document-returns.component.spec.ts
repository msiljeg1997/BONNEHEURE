import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReturnsComponent } from './document-returns.component';

describe('DocumentReturnsComponent', () => {
  let component: DocumentReturnsComponent;
  let fixture: ComponentFixture<DocumentReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentReturnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
