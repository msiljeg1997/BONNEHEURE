import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/models/api/api-response';
import { GalleriaModule } from 'primeng/galleria';
import { UiService } from '../components/ui/ui.service';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-proizvodi-naslovna',
  templateUrl: './proizvodi-naslovna.component.html',
  styleUrls: ['./proizvodi-naslovna.component.scss']
})
export class ProizvodiNaslovnaComponent implements OnInit, AfterViewInit {
  @Input() item!: Product;
  @Input() imgIndex?: number;


  public baseUrl: string = environment.productImagesUrl;

  public product: Product = new Product();

  display: boolean = false;

  public product_quantity: number = 0;
  isMobile = window.innerWidth < 475;
  @ViewChild('myDialog') dialog?: Dialog;

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
    public cartService: CartService,
    private apiResponse: ApiResponse

  ) {
  }
  ngAfterViewInit(): void {
    if (this.dialog) {
      this.dialog.maximize();
    }
  }

  ngOnInit(): void {
    this.getProductDetails();


  }

  logProduct(): void {
    console.log(this.product);
  }

  openDialog() {
    this.display = true;
    setTimeout(() => {
      this.dialog?.maximize();
    });
  }
  onDialogShow() {
    if (this.dialog) {
      this.dialog.maximize();
    }
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

  getProductIdFromService(): number {
    return this.item!.id!;
  }

  getProductDetails(): void {
    let id = this.getProductIdFromService(); // TREBA MI ID PROIZVODA DA BI API ZAHTJEV RADIO

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
