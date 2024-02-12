import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { Product } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  public baseUrl: string = environment.productImagesUrl;

  public products: Product[] = [];
  public selectedProduct: Product = new Product();

  public displayEditProductForm: boolean = false;

  public isEditing: boolean = false;

  constructor(
    private apiService: ApiService,
    private uiService: UiService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.uiService.countRequestUp();

    this.products = [];

    try {
      this.apiService.getProducts().subscribe(res => {
        if (res.status == "OK") {
          this.products = res.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata proizvoda.");
        }
      });
    } catch (error) {
      this.products = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata proizvoda.");
    }
  }

  public toggleEditProductForm($isRefresh: boolean, $selectedProduct: Product | null = null): void {
    if ($selectedProduct != null) {
      this.selectedProduct = this.helperService.deepCopy($selectedProduct);
    }

    this.isEditing = true;

    this.displayEditProductForm = !this.displayEditProductForm;

    if ($isRefresh) {
      this.getData();
    }
  }

  public clearFilters($table: Table): void {
    $table.clear();
  }

  public toggleAddProductForm(): void {
    this.selectedProduct = new Product();

    this.isEditing = false;

    this.displayEditProductForm = !this.displayEditProductForm;
  }

  public deleteProduct($product: Product): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteProduct($product.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Proizvod uspješno obrisan.");
    
          this.getData();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod brisanja Proizvoda.");
    
          this.getData();
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod brisanja Proizvoda.");
    
      this.getData();
    }
  }

  public toggleDeleteProductDialog($product: Product): void {
    this.uiService.confirmDialog("Brisanje korisnika", "Jeste li sigurni da želite obrisati korisnika " + $product.name + "?", () => this.deleteProduct($product));
  }

}
