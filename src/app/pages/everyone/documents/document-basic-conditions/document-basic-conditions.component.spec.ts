import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBasicConditionsComponent } from './document-basic-conditions.component';

describe('DocumentBasicConditionsComponent', () => {
  let component: DocumentBasicConditionsComponent;
  let fixture: ComponentFixture<DocumentBasicConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentBasicConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentBasicConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
