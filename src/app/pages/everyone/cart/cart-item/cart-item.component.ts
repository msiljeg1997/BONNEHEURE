import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/api/api-response';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  public baseUrl: string = environment.productImagesUrl;

  @Input() item!: CartItem;

  constructor(
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.item = Object.assign(new CartItem(), this.item);
  }

  public changeMade() {
    this.cartService.change_made = true;
  }
}
