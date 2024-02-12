import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDeliveryComponent } from './document-delivery.component';

describe('DocumentDeliveryComponent', () => {
  let component: DocumentDeliveryComponent;
  let fixture: ComponentFixture<DocumentDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
