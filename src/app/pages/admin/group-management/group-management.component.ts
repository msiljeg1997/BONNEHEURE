import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { ProductCategory } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})
export class GroupManagementComponent implements OnInit {

  public categories: ProductCategory[] = [];
  public selectedCategory: ProductCategory = new ProductCategory();

  public displayEditProductCategoryForm: boolean = false;

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

    this.categories = [];

    try {
      this.apiService.getProductCategories().subscribe(res => {
        if (res.status == "OK") {
          this.categories = res.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata kategorija.");
        }
      });
    } catch (error) {
      this.categories = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata kategorija.");
    }
  }

  public toggleEditCategoryForm($isRefresh: boolean, $selectedCategory: ProductCategory | null = null): void {
    if ($selectedCategory != null) {
      this.selectedCategory = this.helperService.deepCopy($selectedCategory);
    }

    this.isEditing = true;

    this.displayEditProductCategoryForm = !this.displayEditProductCategoryForm;

    if ($isRefresh) {
      this.getData();
    }
  }

  public clearFilters($table: Table): void {
    $table.clear();
  }

  public toggleAddCategoryForm(): void {
    this.selectedCategory = new ProductCategory();

    this.isEditing = false;

    this.displayEditProductCategoryForm = !this.displayEditProductCategoryForm;
  }

  public deleteProduct($product_category: ProductCategory): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteProductCategory($product_category.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Kategorija uspješno obrisana.");
    
          this.getData();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod brisanja kategorije.");
    
          this.getData();
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod brisanja kategorije.");
    
      this.getData();
    }
  }

  public toggleDeleteCategoryDialog($product_category: ProductCategory): void {
    this.uiService.confirmDialog("Brisanje korisnika", "Jeste li sigurni da želite obrisati korisnika " + $product_category.description + "?", () => this.deleteProduct($product_category));
  }

}
