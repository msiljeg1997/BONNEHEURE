import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { Product, ProductCategory, ProductImage, ProductVariant } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { AvailabilityStatusVar } from 'src/app/variables/availabilityStatus';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  formGroup = this.formBuilder.group({
    name: new FormControl("", [
      Validators.required,
      Validators.maxLength(250),
    ]),
    description: new FormControl("", [
      Validators.maxLength(2000),
    ]),
    category_id: new FormControl("", []),
    featured: new FormControl("", []),
    disabled: new FormControl("", []),
    price_eur: new FormControl("", [
      Validators.max(999999),
    ]),
    price_hrk: new FormControl("", []),
    detailed_description: new FormControl("", [
      Validators.maxLength(10000),
    ]),
    discount_percentage: new FormControl("", [
      Validators.max(100),
    ]),
    discount_price_hrk: new FormControl("", []),
    discount_price_eur: new FormControl("", []),
    unit_of_measure: new FormControl("", [
      Validators.maxLength(50),
    ]),
    availability_status: new FormControl("", []),
    table_view_variant: new FormControl("", []),
  });

  public availabilityStatuses: SelectItem[] = AvailabilityStatusVar.AVAILABILITY_STATUSES;

  public baseUrl: string = environment.productImagesUrl;

  public responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  @Input() display: boolean = false;

  @Input() isEditing: boolean = false;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  @Input() product!: Product;

  public productImages: ProductImage[] = [];

  public productCategories: ProductCategory[] = [];

  public productVariants: ProductVariant[] = [];

  @ViewChild('fileInput', { static: false }) public fileUploader!: ElementRef;

  private fileToUpload: any;

  public fileUploadAltText: string = "";

  public displayEditImageSettings: boolean = false;

  public selectedImage: ProductImage = new ProductImage();

  public isEditingVariant: boolean = false;

  public selectedVariant: ProductVariant = new ProductVariant();

  public displayEditVariantForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private uiService: UiService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.getProductCategories();

    if (this.isEditing) {
      this.getProductImages();
      this.getProductDetailedDescription();
      this.getProductVariants();
    }
  }

  public closeDialog($refresh: boolean): void {
    this.closeDialogEmitter.emit($refresh);
  }

  public saveChanges(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.postProduct(this.product).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.closeDialog(true);
          this.uiService.showSuccess("Proizvod uspješno spremljen.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja proizvoda.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja proizvoda.");
    }
  }

  private getProductCategories(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getProductCategories().subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.productCategories = res.data;
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata kategorija.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata kategorija.");
    }
  }

  private getProductImages(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getProductImages(this.product.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.productImages = res.data;
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata slika.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata slika.");
    }
  }

  public getProductPriceHrk(): number {
    this.product.price_hrk = parseFloat(((this.product.price_eur ?? 0) * 7.53450).toFixed(2));

    return this.product.price_hrk;
  }

  public getProductDiscountPriceEur(): number {
    let discoun_amount = parseFloat((((this.product.discount_percentage ?? 0) / 100) * (this.product.price_eur ?? 0)).toFixed(2));
    this.product.discount_price_eur = (this.product.price_eur ?? 0) - discoun_amount;

    return this.product.discount_price_eur;
  }

  public getProductDiscountPriceHrk(): number {
    this.product.discount_price_hrk = parseFloat(((this.product.discount_price_eur ?? 0) * 7.53450).toFixed(2));

    return this.product.discount_price_hrk;
  }

  public isFormInvalid(): boolean {
    if (!this.formGroup.valid) {
      return true;
    }

    return false;
  }

  public onFileChange($event: any): void {
    if ($event.target.files.length > 0) {
      this.fileToUpload = $event.target.files[0];
    }
  }

  public uploadFile(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.uploadProductFile(this.fileToUpload, this.product.id!, this.fileUploadAltText).subscribe(response => {
        if (response.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Datoteka spremljena.")
          this.resetFileUpload();
          this.getProductImages();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja datoteke.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja datoteke.");
      this.resetFileUpload();
    }
  }

  private resetFileUpload(): void {
    this.fileUploadAltText = "";
    this.fileUploader.nativeElement.value = "";
  }

  public deleteImage($image: ProductImage): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteProductImage($image.id!).subscribe(response => {
        if (response.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Slika izbrisana.")
          this.getProductImages();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod brisanja slike..");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod brisanja slike.");
    }
  }

  public toggleDeleteImageDialog($image: ProductImage): void {
    this.uiService.confirmDialog("Brisanje slike", "Jeste li sigurni da želite obrisati sliku " + $image.alt_text + "?", () => this.deleteImage($image));
  }

  private getProductDetailedDescription(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getProductDetailedDescription(this.product.id!).subscribe(response => {
        if (response.status == "OK") {
          this.product.detailed_description = response.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata detaljnog opisa.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata detaljnog opisa.");
    }
  }

  public toggleEditImageSettingsForm($refresh: boolean, $selectedImage: ProductImage | null = null): void {
    if ($selectedImage) {
      this.selectedImage = this.helperService.deepCopy($selectedImage);
    }

    this.displayEditImageSettings = !this.displayEditImageSettings;

    if ($refresh) {
      this.saveImageSettingsChanges();
      this.getProductImages();
    }
  }

  private getProductVariants(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getProductVariants(this.product.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.productVariants = res.data;
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata varijanti.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata varijanti.");
    }
  }

  public toggleAddVariantForm(): void {
    this.selectedVariant = new ProductVariant();
    this.selectedVariant.item_id = this.product.id;

    this.isEditingVariant = false;

    this.displayEditVariantForm = !this.displayEditVariantForm;
  }

  public toggleEditVariantForm($isRefresh: boolean, $selectedVariant: ProductVariant | null = null): void {
    if ($selectedVariant != null) {
      this.selectedVariant = this.helperService.deepCopy($selectedVariant);
    }

    this.isEditingVariant = true;

    this.displayEditVariantForm = !this.displayEditVariantForm;

    if ($isRefresh) {
      this.getProductVariants();
    }
  }

  public clearFilters($table: Table): void {
    $table.clear();
  }

  public deleteVariant($variant: ProductVariant): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteProductVariant($variant.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Varijanta uspješno obrisana.");
    
          this.getProductVariants();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod brisanja varijante.");
    
          this.getProductVariants();
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod brisanja varijante.");
    
      this.getProductVariants();
    }
  }

  public toggleDeleteVariantDialog($variant: ProductVariant): void {
    this.uiService.confirmDialog("Brisanje varijante", "Jeste li sigurni da želite obrisati varijantu " + $variant.name + "?", () => this.deleteVariant($variant));
  }

  public saveImageSettingsChanges(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.postImageSettings(this.selectedImage).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Postavke slike uspješno spremljene.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja postavki.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja postavki.");
    }
  }

}
