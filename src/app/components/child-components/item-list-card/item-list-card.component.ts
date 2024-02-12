import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/api/api-response';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-list-card',
  templateUrl: './item-list-card.component.html',
  styleUrls: ['./item-list-card.component.scss']
})
export class ItemListCardComponent implements OnInit {

  public baseUrl: string = environment.productImagesUrl;

  @Input() item!: Product;

  constructor(
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.item = Object.assign(new Product(), this.item);
  }

}
