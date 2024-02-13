import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { environment } from 'src/environments/environment';
import { UiService } from '../ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/models/api/api-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public baseUrl: string = environment.productImagesUrl;

  public product: Product = new Product();

  public product_quantity: number = 0;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];


  public assetsUrl: string = environment.assetImagesUrl;


  constructor(
    public navbarService: NavbarService,
    public itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private uiService: UiService,
    private apiService: ApiService,
    public cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.getProductDetails();
  }




  menuItems = [
    {
        label: 'Trgovina',
        url: 'http://www.your-homepage-url.com'
    },
    {
        label: 'Kontakt',
        url: 'http://www.your-about-url.com'
    },
    {
        label: 'O nama',
        url: 'http://www.your-shop-url.com'
    }
];


getProductIdFromUrl(): number {
  // 'url: http.../proizvod/nestonestonesto-22' -> 22 je id
  let name_and_id = this.activatedRoute.snapshot.paramMap.get('name_id');

  let id = 0;

  let separator_position = 0;

  if (name_and_id) {
    for (let i = 1; i < name_and_id.length; i++) {
      if (name_and_id[name_and_id.length - i] == '_') {
        separator_position = name_and_id.length - i;
      }
    }
  }

  id = Number(name_and_id?.substring(separator_position + 1, name_and_id.length));

  return id;
}

getProductDetails(): void {
  let id = this.getProductIdFromUrl();

  if (id == 0) {
    this.uiService.showError('Greška kod dohvata detalja proizvoda');
    return;
  }

  this.uiService.countRequestUp();

  try {
    this.apiService.getItem(id).subscribe(res => {
      if (res.status == "OK") {
        this.product = res.data;
        window.scrollTo(0, 0);
        this.uiService.countRequestDown();
      } else {
        this.uiService.countRequestDown();
        this.uiService.showError("Pogreška kod dohvata proizvoda.");
      }
    });
  } catch (error) {
    this.uiService.countRequestDown();
    this.uiService.showError("Greška kod dohvata proizvoda.");
  }
}


}
