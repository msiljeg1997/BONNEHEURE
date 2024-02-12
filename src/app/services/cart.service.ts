import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UiService } from '../components/ui/ui.service';
import { CartItem, CartOrderDetails, CorvusInfo, CountyDeliveryRate, Product, ProductVariant } from '../models/api/api-response';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public formGroupDelivery = this.formBuilder.group({
    first_name: new FormControl("", [
      Validators.required,
      Validators.maxLength(100),
    ]),
    last_name: new FormControl("", [
      Validators.required,
      Validators.maxLength(100),
    ]),
    phone_no: new FormControl("", [
      Validators.required,
      Validators.maxLength(20),
    ]),
    county: new FormControl("", [
      Validators.required,
    ]),
    address: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    city: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    post_code: new FormControl("", [
      Validators.required,
      Validators.maxLength(10)
    ]),
    remark: new FormControl("", [
      Validators.maxLength(250),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.maxLength(250),
      Validators.email,
    ])
  });

  public formGroupBusinessBill = this.formBuilder.group({
    business_oib: new FormControl("", [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    business_name: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    business_address: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    business_city: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    business_post_code: new FormControl("", [
      Validators.required,
      Validators.maxLength(10)
    ]),
    business_phone_no: new FormControl("", [
      Validators.maxLength(20)
    ]),
    business_first_name: new FormControl("", [
      Validators.maxLength(100)
    ]),
    business_last_name: new FormControl("", [
      Validators.maxLength(100),
    ]),
    business_email: new FormControl("", [
      Validators.required,
      Validators.maxLength(250),
      Validators.email,
    ])
  });

  public cart: CartItem[] = [];
  public cart_order_details: CartOrderDetails = new CartOrderDetails();

  public corvus_info: CorvusInfo = new CorvusInfo();

  public total_price: number = 0;
  public total_price_no_discount: number = 0;
  public total_discount_amount: number = 0;
  public total_vat: number = 0;
  public total_price_no_vat: number = 0;
  public special_discount_percentage: number = 0;
  public special_discount_amount: number = 0;
  public change_made: boolean = false;
  public county_delivery_rates: CountyDeliveryRate[] = [];

  public pay_on_delivery: boolean = true;
  public pay_with_card: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private apiService: ApiService,
    private uiService: UiService,
    private formBuilder: FormBuilder,
  ) {
    this.getCart();
    this.getCountyDeliveryRates();
  }

  private makeCartItem($item: Product, $quantity: number): CartItem {

    let cartItem = new CartItem();
    cartItem.item_id = $item.id;
    cartItem.quantity = $quantity;
    if ($item.variant_exists) {
      cartItem.variant_exists = true;
      cartItem.variant_id = $item.selected_variant!.id;
    } else {
      cartItem.variant_exists = false;
    }
    if (this.storageService.isLoggedin()) {
      cartItem.is_logged_in = true;
    } else {
      cartItem.is_logged_in = false;
      cartItem.cart_code = this.storageService.getCartCode();
    }

    return cartItem;
  }

  private makeCartItemsVariantTable($variants: ProductVariant[], $item_id: number): CartItem[] {
    let cartItems: CartItem[] = []

    $variants.forEach(variant => {
      let cartItem = new CartItem();
      cartItem.item_id = $item_id;
      cartItem.quantity = variant.quantity;
      cartItem.variant_exists = true;
      cartItem.variant_id = variant.id;
      if (this.storageService.isLoggedin()) {
        cartItem.is_logged_in = true;
      } else {
        cartItem.is_logged_in = false;
        cartItem.cart_code = this.storageService.getCartCode();
      }
      if (cartItem.quantity && cartItem.quantity > 0) {
        cartItems.push(cartItem);
      }
    });

    return cartItems;
  }

  public addToCart($item: Product, $quantity: number): void {
    if ($item.table_view_variant) {
      this.router.navigate(['/proizvod', $item.getProductUrlName() + '_' + $item.id]);
      return;
    }

    let cartItem = this.makeCartItem($item, $quantity);

    this.uiService.countRequestUp();

    try {
      this.apiService.postToCart(cartItem).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.showSuccess('Proizvod dodan');
          this.getCart();
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dodavanja proizvoda u košaricu.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dodavanja proizvoda u košaricu.");
    }
  }

  public addToCartVariantTable($product: Product, $variants: ProductVariant[]): void {
    let cartItems: CartItem[] = [];

    cartItems = this.makeCartItemsVariantTable($variants, $product.id!);

    if (cartItems.length == 0) {
      this.uiService.showWarn("Odaberite količinu");
      return;
    }

    this.uiService.countRequestUp();

    try {
      this.apiService.postToCartVariantTable(cartItems).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.showSuccess('Proizvod dodan');
          this.getCart();
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dodavanja proizvoda u košaricu.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dodavanja proizvoda u košaricu.");
    }
  }

  public getCart(): void {
    this.change_made = true;
    try {
      this.apiService.getCart(localStorage.getItem('cart_code')).subscribe(res => {
        if (res.status == "OK") {
          this.cart = res.data.cart_items;
          this.total_price = res.data.total_price;
          this.total_price_no_discount = res.data.total_price_no_discount;
          this.total_discount_amount = res.data.total_discount_amount;
          this.total_vat = res.data.total_vat;
          this.total_price_no_vat = res.data.total_price_no_vat;
          this.special_discount_percentage = res.data.special_discount_percentage;
          this.special_discount_amount = res.data.special_discount_amount;
          this.change_made = false;
        } else {
          this.change_made = true;
          this.uiService.showError("Pogreška kod dohvata košarice.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.change_made = true;
      this.uiService.showError("Greška kod dohvata košarice.");
    }
  }

  public removeFromCart($item: CartItem): void {
    this.uiService.countRequestUp();

    if (this.storageService.isLoggedin()) {
      $item.is_logged_in = true;
    } else {
      $item.is_logged_in = false;
      $item.cart_code = this.storageService.getCartCode();
    }

    try {
      this.apiService.deleteFromCart($item).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.showSuccess('Proizvod uklonjen');
          this.getCart();
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod uklanjanja proizvoda iz košarice.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod uklanjanja proizvoda iz košarice.");
    }

  }

  public getCartLength(): number {
    return this.cart.length;
  }

  public updateCartItem($item: CartItem): void {
    this.uiService.countRequestUp();

    if (this.storageService.isLoggedin()) {
      $item.is_logged_in = true;
    } else {
      $item.is_logged_in = false;
      $item.cart_code = this.storageService.getCartCode();
    }

    try {
      this.apiService.updateCart($item).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.showSuccess('Količina ažurirana');
          this.getCart();
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod ažuriranja količine iz košarice.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod ažuriranja količine iz košarice.");
    }
  }

  public getCountyDeliveryRates(): void {
    this.change_made = true;

    try {
      this.apiService.getCountyDeliveryRates().subscribe(res => {
        if (res.status == "OK") {
          this.county_delivery_rates = res.data;
          this.change_made = false;
        } else {
          this.uiService.showError("Pogreška kod ažuriranja količine iz košarice.");
        }
      });
    } catch (error) {
      this.uiService.showError("Greška kod ažuriranja količine iz košarice.");
    }
  }

  public orderCart(): void {
    this.uiService.countRequestUp();

    if (this.storageService.isLoggedin()) {
      this.cart_order_details.is_logged_in = true;
    } else {
      this.cart_order_details.is_logged_in = true;
      this.cart_order_details.cart_code = this.storageService.getCartCode();
    }

    try {
      this.apiService.orderCart(this.cart_order_details).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.showSuccess('Narudžba napravljena. Provjerite vaš e-mail.');
          this.getCart();
          this.router.navigate(['/products']);
          this.uiService.countRequestDown();
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

  public goToItem(item: Product): void {
    this.router.navigate(['/proizvod', item.getProductUrlName() + '_' + item.id]);
  }

  public async payCart(): Promise<void> {
    this.uiService.countRequestUp();

    if (this.storageService.isLoggedin()) {
      this.cart_order_details.is_logged_in = true;
    } else {
      this.cart_order_details.is_logged_in = true;
      this.cart_order_details.cart_code = this.storageService.getCartCode();
    }

    try {
      this.apiService.getCorvusInfo(this.cart_order_details).subscribe(res => {
        if (res.status == "OK") {
          this.corvus_info = res.data;
          this.uiService.countRequestDown();
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
