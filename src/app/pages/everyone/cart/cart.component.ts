import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
	@ViewChild('submitPayment') submitPayment!: ElementRef;

  public step: number = 1;

  public isDeliveryFormValid: boolean = false;

  constructor(
    public cartService: CartService,
    private storageService: StorageService,
    private uiService: UiService,
    private apiService: ApiService,
		private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.cartService.getCart();
    window.scrollTo(0, 0);
  }

  public changeStep($option: string): void {
    if ($option == 'down') {
      this.step--;
    } else if ($option == 'up') {
      this.step++;
    }
  }

  public scrollTo(el: HTMLElement): void {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  public updateIsFormValid($event: any): void {
    this.isDeliveryFormValid = $event;
  }

  public payCart(): void {
    this.uiService.countRequestUp();

    if (this.storageService.isLoggedin()) {
      this.cartService.cart_order_details.is_logged_in = true;
    } else {
      this.cartService.cart_order_details.is_logged_in = true;
      this.cartService.cart_order_details.cart_code = this.storageService.getCartCode();
    }

    try {
      this.apiService.getCorvusInfo(this.cartService.cart_order_details).subscribe(res => {
        if (res.status == "OK") {
          this.cartService.corvus_info = res.data;
          this.cdr.detectChanges();
          this.submitPayment.nativeElement.click();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod izvršavanja narudžbe.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod izvršavanja narudžbe.");
    }
  }

}
