import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as ApiModels from '../models/api/api-response';
import { StorageService } from './storage.service';
import { Md5 } from 'ts-md5';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  headers!: HttpHeaders;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private helperService: HelperService,
  ) {
  }

  private getHeaders() {
    this.headers = new HttpHeaders({
      'Authorization': this.storageService.getUserToken()
    });

    return {
      'headers': this.headers
    }
  }

  /**
   * Auth, login, register...
   */

  public login($email: string, $password: string): Observable<ApiModels.APIResponse<ApiModels.Login>> {
    $password = Md5.hashStr($password);

    return this.http.post<ApiModels.APIResponse<ApiModels.Login>>(`${this.baseUrl}/login`, { email: $email, password: $password })
      .pipe(map(res => res));
  }

  public register($email: string, $password: string, $username: string): Observable<ApiModels.APIResponse<[]>> {
    $password = Md5.hashStr($password);

    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/register`, { email: $email, password: $password, username: $username })
      .pipe(map(res => res));
  }

  public verifyRegister($hash: string): Observable<ApiModels.APIResponse<[]>> {
    return this.http.get<ApiModels.APIResponse<[]>>(`${this.baseUrl}/verify_registration/${$hash}`)
      .pipe(map(res => res));
  }

  public resetPassword($email: string): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/reset_password`, { email: $email })
      .pipe(map(res => res));
  }

  public confirmResetPassword($hash: string, $username: string, $password: string): Observable<ApiModels.APIResponse<[]>> {
    $password = Md5.hashStr($password);

    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/verify_reset_password`, { hash: $hash, username: $username, password: $password })
      .pipe(map(res => res));
  }

  /**
   * Public routes (products, featured products, place order...)
   */

  public getItems(): Observable<ApiModels.APIResponse<ApiModels.ItemsResponseData>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.ItemsResponseData>>(`${this.baseUrl}/items`)
      .pipe(map((response: ApiModels.APIResponse<ApiModels.ItemsResponseData>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ItemsResponseData>(), response);
        ret.data.items_all.forEach(item => {
          item = Object.assign(new ApiModels.Product(), item);

          if (item.featured) {
            ret.data.items_featured.push(Object.assign(new ApiModels.Product(), item));
          }

          if (item.discount_percentage && item.discount_percentage > 0) {
            ret.data.items_discount.push(Object.assign(new ApiModels.Product(), item));
          }
        });
        return ret;
      }));
  }

  public getItem($id: number): Observable<ApiModels.APIResponse<ApiModels.Product>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.Product>>(`${this.baseUrl}/item/${$id}`)
      .pipe(map((response: ApiModels.APIResponse<ApiModels.Product>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.Product>(), response);
        ret.data = Object.assign(new ApiModels.Product(), ret.data);
        return ret;
      }));
  }

  /**
   * Users
   */

  public getUsers(): Observable<ApiModels.APIResponse<ApiModels.User[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.User[]>>(`${this.baseUrl}/users`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.User[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.User[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.User) => {
          ret.data.push(Object.assign(new ApiModels.User(), element));
        });
        return ret;
      }));
  }

  public postUser($user: ApiModels.User): Observable<ApiModels.APIResponse<[]>> {
    if (!$user.password || !$user.confirm_password) {
      throw new Error();
    }

    $user.password = Md5.hashStr($user.password);
    $user.confirm_password = Md5.hashStr($user.confirm_password);

    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/user`, $user, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.User>(), response);
        ret.data = Object.assign(new ApiModels.User(), ret.data);
        return ret;
      }));
  }

  public editUser($user: ApiModels.User): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/edit_user`, $user, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.User>(), response);
        ret.data = Object.assign(new ApiModels.User(), ret.data);
        return ret;
      }));
  }

  public deleteUser($id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/user/${$id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.User>(), response);
        ret.data = Object.assign(new ApiModels.User(), ret.data);
        return ret;
      }));
  }

  public changeUserPassword($id: number, $password: string, $confirm_password: string): Observable<ApiModels.APIResponse<[]>> {
    $password = Md5.hashStr($password);
    $confirm_password = Md5.hashStr($confirm_password);

    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/user/change_password`, { id: $id, password: $password, confirm_password: $confirm_password }, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.User>(), response);
        ret.data = Object.assign(new ApiModels.User(), ret.data);
        return ret;
      }));
  }

  /**
   * Products
   */

  public getProducts(): Observable<ApiModels.APIResponse<ApiModels.Product[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.Product[]>>(`${this.baseUrl}/products`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.Product[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.Product[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.Product) => {
          ret.data.push(Object.assign(new ApiModels.Product(), element));
        });
        return ret;
      }));
  }

  public deleteProduct($id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_product/${$id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.Product>(), response);
        ret.data = Object.assign(new ApiModels.Product(), ret.data);
        return ret;
      }));
  }

  public postProduct($product: ApiModels.Product): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/product`, $product, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.Product>(), response);
        ret.data = Object.assign(new ApiModels.Product(), ret.data);
        return ret;
      }));
  }

  public getProductCategories(): Observable<ApiModels.APIResponse<ApiModels.ProductCategory[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.ProductCategory[]>>(`${this.baseUrl}/product_categories`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.ProductCategory[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductCategory[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.ProductCategory) => {
          ret.data.push(Object.assign(new ApiModels.ProductCategory(), element));
        });
        return ret;
      }));
  }

  public getProductImages($product_id: number): Observable<ApiModels.APIResponse<ApiModels.ProductImage[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.ProductImage[]>>(`${this.baseUrl}/product_images/${$product_id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.ProductImage[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductImage[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.ProductImage) => {
          ret.data.push(Object.assign(new ApiModels.ProductImage(), element));
        });
        return ret;
      }));
  }

  public uploadProductFile($file: any, $product_id: number, $alt_text: string): Observable<ApiModels.APIResponse<[]>> {
    const fd: FormData = new FormData();
    fd.append("file", $file, $file.name);
    fd.append("alt_text", $alt_text);
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/product_file_upload/${$product_id}`, fd, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<ApiModels.ProductCategory[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public deleteProductImage($image_id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_product_image/${$image_id}`, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public deleteProductCategory($category_id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_product_category/${$category_id}`, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public postCategory($category: ApiModels.ProductCategory): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/category`, $category, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductCategory>(), response);
        ret.data = Object.assign(new ApiModels.ProductCategory(), ret.data);
        return ret;
      }));
  }

  public getProductDetailedDescription($product_id: number): Observable<ApiModels.APIResponse<string>> {
    return this.http.get<ApiModels.APIResponse<string>>(`${this.baseUrl}/product_detailed_description/${$product_id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<string>) => {
        const ret = Object.assign(new ApiModels.APIResponse<string>(), response);
        return ret;
      }));
  }

  public postImageSettings($image: ApiModels.ProductImage): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/image_settings`, $image, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  public getProductVariants($id: number): Observable<ApiModels.APIResponse<ApiModels.ProductVariant[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.ProductVariant[]>>(`${this.baseUrl}/product_variants/${$id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.ProductVariant[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductVariant[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.ProductVariant) => {
          ret.data.push(Object.assign(new ApiModels.ProductVariant(), element));
        });
        return ret;
      }));
  }

  public deleteProductVariant($id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_product_variant/${$id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductVariant>(), response);
        ret.data = Object.assign(new ApiModels.Product(), ret.data);
        return ret;
      }));
  }

  public postProductVariant($product_variant: ApiModels.ProductVariant): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/product_variant`, $product_variant, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductVariant>(), response);
        ret.data = Object.assign(new ApiModels.ProductVariant(), ret.data);
        return ret;
      }));
  }

  public deleteProductVariantImage($image_id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_product_variant_image/${$image_id}`, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public getProductVariantImages($variant_id: number): Observable<ApiModels.APIResponse<ApiModels.ProductImage[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.ProductImage[]>>(`${this.baseUrl}/product_variant_images/${$variant_id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.ProductImage[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.ProductImage[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.ProductImage) => {
          ret.data.push(Object.assign(new ApiModels.ProductImage(), element));
        });
        return ret;
      }));
  }

  public getProductVariantDetailedDescription($variant_id: number): Observable<ApiModels.APIResponse<string>> {
    return this.http.get<ApiModels.APIResponse<string>>(`${this.baseUrl}/product_variant_detailed_description/${$variant_id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<string>) => {
        const ret = Object.assign(new ApiModels.APIResponse<string>(), response);
        return ret;
      }));
  }

  public uploadProductVariantFile($file: any, $product_id: number, $variant_id: number, $alt_text: string): Observable<ApiModels.APIResponse<[]>> {
    const fd: FormData = new FormData();
    fd.append("file", $file, $file.name);
    fd.append("alt_text", $alt_text);
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/product_variant_file_upload/${$product_id}/${$variant_id}`, fd, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<ApiModels.ProductCategory[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public postVariantImageSettings($image: ApiModels.ProductImage): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/variant_image_settings`, $image, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  /**
   * Logs
   */

  public getLogs(): Observable<ApiModels.APIResponse<ApiModels.Log[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.Log[]>>(`${this.baseUrl}/logs`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.Log[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.Log[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.Log) => {
          ret.data.push(Object.assign(new ApiModels.Log(), element));
        });
        return ret;
      }));
  }

  /**
   * Orders
   */
  public getOrders(): Observable<ApiModels.APIResponse<ApiModels.OrderHeader[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.OrderHeader[]>>(`${this.baseUrl}/orders`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.OrderHeader[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.OrderHeader[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.OrderHeader) => {
          element.datetime = this.helperService.makeDateObject(element.datetime);

          ret.data.push(Object.assign(new ApiModels.OrderHeader(), element));
        });
        return ret;
      }));
  }

  public getOrderLines($id: number): Observable<ApiModels.APIResponse<ApiModels.OrderLine[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.OrderLine[]>>(`${this.baseUrl}/order_lines/${$id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.OrderLine[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.OrderLine[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.OrderLine) => {
          ret.data.push(Object.assign(new ApiModels.OrderLine(), element));
        });
        return ret;
      }));
  }

  public getUserOrders(): Observable<ApiModels.APIResponse<ApiModels.OrderHeader[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.OrderHeader[]>>(`${this.baseUrl}/user_orders`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.OrderHeader[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.OrderHeader[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.OrderHeader) => {
          element.datetime = this.helperService.makeDateObject(element.datetime);

          ret.data.push(Object.assign(new ApiModels.OrderHeader(), element));
        });
        return ret;
      }));
  }

  public getUserOrderLines($id: number): Observable<ApiModels.APIResponse<ApiModels.OrderLine[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.OrderLine[]>>(`${this.baseUrl}/user_order_lines/${$id}`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.OrderLine[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.OrderLine[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.OrderLine) => {
          ret.data.push(Object.assign(new ApiModels.OrderLine(), element));
        });
        return ret;
      }));
  }

  public postRepeatOrder($order_id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/repeat_order`, { order_id: $order_id }, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.OrderLine[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  /**
   * Cart
   */

  public postToCart($cart_item: ApiModels.CartItem): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/cart`, $cart_item, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  public postToCartVariantTable($cart_items: ApiModels.CartItem[]): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/cart_variant_table`, { cart_items: $cart_items }, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  public getCart($cart_code: string | null): Observable<ApiModels.APIResponse<ApiModels.Cart>> {
    return this.http.post<ApiModels.APIResponse<ApiModels.Cart>>(`${this.baseUrl}/get_cart`, { cart_code: $cart_code }, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.Cart>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.Cart>(), response);
        return ret;
      }));
  }

  public deleteFromCart($cart_item: ApiModels.CartItem): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/cart_delete`, $cart_item, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  public updateCart($cart_item: ApiModels.CartItem): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/cart_update`, $cart_item, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  public getCountyDeliveryRates(): Observable<ApiModels.APIResponse<ApiModels.CountyDeliveryRate[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.CountyDeliveryRate[]>>(`${this.baseUrl}/get_county_delivery_rates`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.CountyDeliveryRate[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.CountyDeliveryRate[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.CountyDeliveryRate) => {
          ret.data.push(Object.assign(new ApiModels.CountyDeliveryRate(), element));
        });
        return ret;
      }));
  }

  public orderCart($cart_order_details: ApiModels.CartOrderDetails): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/cart_order`, $cart_order_details, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
        return ret;
      }));
  }

  public getCorvusInfo($cart_order_details: ApiModels.CartOrderDetails): Observable<ApiModels.APIResponse<ApiModels.CorvusInfo>> {
    return this.http.post<ApiModels.APIResponse<ApiModels.CorvusInfo>>(`${this.baseUrl}/corvus_pay_info`, $cart_order_details, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.CorvusInfo>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.CorvusInfo>(), response);
        return ret;
      }));
  }

  // Kongres predavaci  

  public getKongresPredavaci(): Observable<ApiModels.APIResponse<ApiModels.KongresPredavac[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.KongresPredavac[]>>(`${this.baseUrl}/get_kongres_predavaci/HR`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.KongresPredavac[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.KongresPredavac[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.KongresPredavac) => {
          ret.data.push(Object.assign(new ApiModels.KongresPredavac(), element));
        });
        return ret;
      }));
  }

  public deleteKongresPredavac($predavac_id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_kongres_predavac/${$predavac_id}`, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public postKongresPredavac($kongres_predavac: ApiModels.KongresPredavac): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/post_kongres_predavac`, $kongres_predavac, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.KongresPredavac>(), response);
        ret.data = Object.assign(new ApiModels.KongresPredavac(), ret.data);
        return ret;
      }));
  }

  public uploadPredavacImage($file: any, $predavac_id: number, $alt_text: string): Observable<ApiModels.APIResponse<[]>> {
    const fd: FormData = new FormData();
    fd.append("file", $file, $file.name);
    fd.append("alt_text", $alt_text);
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/predavac_image_upload/${$predavac_id}`, fd, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<ApiModels.KongresPredavac[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public getKongresRadionice(): Observable<ApiModels.APIResponse<ApiModels.KongresRadionica[]>> {
    return this.http.get<ApiModels.APIResponse<ApiModels.KongresRadionica[]>>(`${this.baseUrl}/get_kongres_radionice/HR`, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<ApiModels.KongresRadionica[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.KongresRadionica[]>(), response);
        ret.data = [];
        response.data?.forEach((element: ApiModels.KongresRadionica) => {
          ret.data.push(Object.assign(new ApiModels.KongresRadionica(), element));
        });
        return ret;
      }));
  }

  public deleteKongresRadionica($predavac_id: number): Observable<ApiModels.APIResponse<[]>> {
    return this.http.delete<ApiModels.APIResponse<[]>>(`${this.baseUrl}/delete_kongres_radionica/${$predavac_id}`, this.getHeaders()).pipe(map((response: ApiModels.APIResponse<[]>) => {
      const ret = Object.assign(new ApiModels.APIResponse<[]>(), response);
      return ret;
    }));
  }

  public postKongresRadionica($kongres_predavac: ApiModels.KongresRadionica): Observable<ApiModels.APIResponse<[]>> {
    return this.http.post<ApiModels.APIResponse<[]>>(`${this.baseUrl}/post_kongres_radionica`, $kongres_predavac, this.getHeaders())
      .pipe(map((response: ApiModels.APIResponse<[]>) => {
        const ret = Object.assign(new ApiModels.APIResponse<ApiModels.KongresRadionica>(), response);
        ret.data = Object.assign(new ApiModels.KongresRadionica(), ret.data);
        return ret;
      }));
  }

}