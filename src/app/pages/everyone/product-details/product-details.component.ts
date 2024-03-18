import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from 'primeng/dialog';
import { UiService } from 'src/app/components/ui/ui.service';
import { Product } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild(Dialog) dialog?: Dialog;

  public baseUrl: string = environment.productImagesUrl;

  public product: Product = new Product();

  public product_quantity: number = 0;


  isMobile = window.innerWidth < 479;

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private uiService: UiService,
    private apiService: ApiService,
    public cartService: CartService,
    private titleService: Title,
    private metaService: Meta
  ) { }
  ngAfterViewInit(): void {
    if (this.dialog) {
      this.dialog.maximize();
    }
  }

  ngOnInit(): void {
    this.getProductDetails();
  }


  display: boolean = false;

  openDialog() {
    this.display = true;
    setTimeout(() => {
      this.dialog?.maximize();
    });
  }

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

          // desc i title proizvodi
          this.titleService.setTitle(this.product.name!);
          const description = this.product.detailed_description!.split('.').slice(0, 10).join('. ');

          this.metaService.updateTag({ name: 'description', content: description });
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
