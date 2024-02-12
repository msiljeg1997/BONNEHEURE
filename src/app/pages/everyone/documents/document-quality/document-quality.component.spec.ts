import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentQualityComponent } from './document-quality.component';

describe('DocumentQualityComponent', () => {
  let component: DocumentQualityComponent;
  let fixture: ComponentFixture<DocumentQualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentQualityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
