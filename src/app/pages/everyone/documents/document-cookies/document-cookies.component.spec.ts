import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCookiesComponent } from './document-cookies.component';

describe('DocumentCookiesComponent', () => {
  let component: DocumentCookiesComponent;
  let fixture: ComponentFixture<DocumentCookiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCookiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCookiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
