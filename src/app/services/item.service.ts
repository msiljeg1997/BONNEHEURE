import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { UiService } from '../components/ui/ui.service';
import { Product, ProductCategory } from '../models/api/api-response';
import { ApiService } from './api.service';
import { HelperService } from './helper.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  sortOptions = [
    { label: 'Cijena od najveće', value: '!price' },
    { label: 'Cijena od najmanje', value: 'price' },
    { label: 'Najveći popust', value: 'discount' },
    { label: 'Naziv A-Z', value: 'az' },
    { label: 'Naziv Z-A', value: 'za' },
  ];

  public yOffset: number = 0;

  public gridLayout: string = 'grid';

  public items_per_page = 12;

  public current_page = 1;
  public current_category = 0;

  public featuredItems: Product[] = [];
  public discountItems: Product[] = [];
  public allItemsBase: Product[] = [];
  public allItemsPagination: Product[] = [];
  public allItems: Product[] = [];

  public itemCategories: MenuItem[] = [];

  public sortKey: any;

  private lastFetchedDateTime: Date = new Date();

  private tenMinInMillisecond: number = 600000;

  public searchText: string = '';

  private componentMethodCallSource = new Subject<any>();

  public componentMethodCalled$ = this.componentMethodCallSource.asObservable();

  constructor(
    private uiService: UiService,
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router,
    private location: Location,
  ) {
    this.getItems();
  }

  private resetPaginator() {
    this.componentMethodCallSource.next(null);
  }

  public applyUrlFilters() {
    this.filterCategory(this.current_category, false);
    this.filterPage(this.current_page - 1);
  }

  private getItems(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getItems().subscribe(res => {
        if (res.status == "OK") {
          this.featuredItems = res.data.items_featured;
          this.discountItems = res.data.items_discount;
          this.allItemsBase = res.data.items_all;
          this.allItemsPagination = res.data.items_all;
          this.setItemCategories(res.data.item_categories)

          this.lastFetchedDateTime = new Date();

          if (this.router.routerState.snapshot.url.includes('/products')) {
            this.applyUrlFilters()
          } else {
            this.resetFilters(false);
          }

          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata proizvoda.");
        }
      });
    } catch (error) {
      this.allItems = [];
      this.allItemsPagination = [];
      this.discountItems = [];
      this.featuredItems = [];

      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata proizvoda.");
    }
  }

  private setItemCategories($item_categories: ProductCategory[]): void {
    this.itemCategories = [];

    let all_menu_item_category: MenuItem = {
      label: 'Svi proizvodi',
      command: () => this.filterCategory(0, true, true),
    }
    this.itemCategories.push(all_menu_item_category);

    $item_categories.forEach(category => {
      let new_menu_category: MenuItem = {
        label: category.description,
        command: () => this.filterCategory(category.id!, true),
      };

      this.itemCategories.push(new_menu_category);
    });
  }

  public setUrl(): void {
    this.location.replaceState("/products/?page=" + this.current_page + '&category=' + this.current_category); // the input field puts this as undefined when in ngmodel
  }

  public refreshData(): void {
    this.allItems = [];
    this.allItemsPagination = [];
    this.discountItems = [];
    this.featuredItems = [];

    this.getItems();
  }

  public filterCategory($id: number, $is_event: boolean, $all: boolean = false): void {
    this.allItems = [];
    this.allItemsPagination = [];

    this.current_category = $id;

    if ($all || $id == 0) {
      this.allItemsPagination = this.allItemsBase;
    } else {
      this.allItemsBase.forEach((item: Product) => {
        if (item.category_id == $id) {
          this.allItemsPagination.push(item);
        }
      });
    }

    // If user changed category, reset page and search filter
    if ($is_event) {
      this.searchText = '';
      this.filterPage(0);
    } else {
      this.filterPage(this.current_page - 1);
    }

    this.resetPaginator();
  }

  public onSortChange($event: any): void {
    if (!$event || !$event.value) {
      return;
    }

    switch ($event.value) {
      case 'price': this.helperService.sort(this.allItemsPagination, 'discount_price_eur'); break;
      case '!price': this.helperService.sort(this.allItemsPagination, '-discount_price_eur'); break;
      case 'discount': this.helperService.sort(this.allItemsPagination, '-discount_percentage'); break;
      case 'az': this.helperService.sort(this.allItemsPagination, 'name'); break;
      case 'za': this.helperService.sort(this.allItemsPagination, '-name'); break;
      default: this.helperService.sort(this.allItemsPagination, 'discount_price_eur'); break;
    }

    this.filterPage(0);
    this.resetPaginator();
  }

  public applySearchFilter($keep_page: boolean): void {
    if (!this.router.routerState.snapshot.url.includes('/products')) {
      this.router.navigate(['/products']);
    }

    let search_text = this.searchText // can't use "this" in lambda -> so make var

    if (search_text == '') {
      this.allItemsPagination = this.allItemsBase;
    } else {
      this.allItemsPagination = this.allItemsBase.filter(function (product: Product) {
        return product.name?.toLowerCase().includes(search_text.toLowerCase()) ||
          product.description?.toLowerCase().includes(search_text.toLowerCase());
      });
    }

    if ($keep_page) {
      this.filterPage(this.current_page - 1);
    } else {
      this.filterPage(0);
    }
    this.current_category = 0;

    this.resetPaginator();
  }

  public filterPage($page: number): void {
    let first_item = $page * this.items_per_page;

    if (first_item > this.allItemsPagination.length) {
      first_item = 0;
    }

    this.allItems = this.allItemsPagination.slice(first_item, first_item + this.items_per_page);

    this.current_page = $page + 1;

    this.setUrl();
  }

  public resetFilters($filter_page: boolean): void {
    this.allItemsPagination = this.allItemsBase;
    this.allItems = this.allItemsBase;
    this.searchText = "";
    this.current_category = 0;
    if ($filter_page) {
      this.filterPage(0);
    }
    this.resetPaginator();
  }

  public refreshIfTimeout(): void {
    let current = new Date();

    let difference = current.getTime() - this.lastFetchedDateTime.getTime();

    if (difference > this.tenMinInMillisecond) {
      this.refreshData();
    }
  }
}
