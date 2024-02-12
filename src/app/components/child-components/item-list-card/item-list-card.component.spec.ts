import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListCardComponent } from './item-list-card.component';

describe('ItemListCardComponent', () => {
  let component: ItemListCardComponent;
  let fixture: ComponentFixture<ItemListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
