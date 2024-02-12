import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  constructor(
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  public changedPaymentMethod($method: string): void {
    if ($method == 'kartica') {
      this.cartService.pay_on_delivery = !this.cartService.pay_on_delivery;
      this.cartService.pay_with_card = !this.cartService.pay_with_card;
    } else if ($method == 'pouzece') {
      this.cartService.pay_with_card = !this.cartService.pay_with_card;
      this.cartService.pay_on_delivery = !this.cartService.pay_on_delivery;
    }
  }

}
