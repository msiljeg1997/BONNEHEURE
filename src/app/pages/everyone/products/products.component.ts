import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataView } from 'primeng/dataview';
import { Paginator } from 'primeng/paginator';
import { UiService } from 'src/app/components/ui/ui.service';
import { CartService } from 'src/app/services/cart.service';
import { HelperService } from 'src/app/services/helper.service';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @HostListener('window:scroll', ['$event'])
  doSomething(event: any) {
    this.itemService.yOffset = window.pageYOffset;
  }

  @ViewChild('dv') table!: DataView;

  @ViewChild('paginator') paginator!: Paginator;

  public baseUrl: string = environment.productImagesUrl;

  constructor(
    public itemService: ItemService,
    public uiService: UiService,
    private cartService: CartService,
    private route: ActivatedRoute,
    public helperService: HelperService,
  ) {
    this.itemService.componentMethodCalled$.subscribe(() => {
      this.resetPaginator();
    })
  }

  ngOnInit(): void {
    this.itemService.refreshIfTimeout();
    this.cartService.getCart();
    this.route.queryParams
      .subscribe(params => {
        let exists = false;
        if (!params['category'] || params['category'] == 'NaN') {
        } else {
          this.itemService.current_category = +params['category'] ?? 0;
          exists = true;
        }

        if (!params['page'] || params['page'] == 'NaN') {
        } else {
          this.itemService.current_page = +params['page'] ?? 1;
          exists = true;
        }

        if (exists) {
          this.itemService.applyUrlFilters();
          this.itemService.setUrl();
        }
      });

    if (this.itemService.searchText && this.itemService.searchText != '') {
      this.itemService.applySearchFilter(true);
    }
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, this.itemService.yOffset);    
  }

  public resetPaginator(): void {
    this.paginator?.changePage(this.itemService.current_page - 1); // doesn't do anything if paginator is undefined (?)
  }

  public paginate($event: any): void {
    this.itemService.filterPage($event.first / this.itemService.items_per_page);
  }

}
