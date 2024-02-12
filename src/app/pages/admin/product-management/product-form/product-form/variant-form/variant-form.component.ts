import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { UiService } from 'src/app/components/ui/ui.service';
import { ProductImage, ProductVariant } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { AvailabilityStatusVar } from 'src/app/variables/availabilityStatus';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-variant-form',
  templateUrl: './variant-form.component.html',
  styleUrls: ['./variant-form.component.scss']
})
export class VariantFormComponent implements OnInit {
  formGroup = this.formBuilder.group({
    name: new FormControl("", [
      Validators.required,
      Validators.maxLength(250),
    ]),
    description: new FormControl("", [
      Validators.maxLength(2000),
    ]),
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

  @Input() variant!: ProductVariant;

  @ViewChild('fileInput', { static: false }) public fileUploader!: ElementRef;

  private fileToUpload: any;

  public fileUploadAltText: string = "";

  public variantImages: ProductImage[] = [];

  public displayEditImageSettings: boolean = false;

  public selectedImage: ProductImage = new ProductImage();

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private uiService: UiService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.getVariantImages();
      this.getVariantDetailedDescription();
    }
  }

  public getProductPriceHrk(): number {
    this.variant.price_hrk = parseFloat(((this.variant.price_eur ?? 0) * 7.53450).toFixed(2));

    return this.variant.price_hrk;
  }

  public getProductDiscountPriceEur(): number {
    let discoun_amount = parseFloat((((this.variant.discount_percentage ?? 0) / 100) * (this.variant.price_eur ?? 0)).toFixed(2));
    this.variant.discount_price_eur = (this.variant.price_eur ?? 0) - discoun_amount;

    return this.variant.discount_price_eur;
  }

  public getProductDiscountPriceHrk(): number {
    this.variant.discount_price_hrk = parseFloat(((this.variant.discount_price_eur ?? 0) * 7.53450).toFixed(2));

    return this.variant.discount_price_hrk;
  }

  public deleteImage($image: ProductImage): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteProductVariantImage($image.id!).subscribe(response => {
        if (response.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Slika izbrisana.")
          this.getVariantImages();
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

  private getVariantImages(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getProductVariantImages(this.variant.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.variantImages = res.data;
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

  private getVariantDetailedDescription(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.getProductVariantDetailedDescription(this.variant.id!).subscribe(response => {
        if (response.status == "OK") {
          this.variant.detailed_description = response.data;
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
      this.getVariantImages();
    }
  }

  public onFileChange($event: any): void {
    if ($event.target.files.length > 0) {
      this.fileToUpload = $event.target.files[0];
    }
  }

  public uploadFile(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.uploadProductVariantFile(this.fileToUpload, this.variant.item_id!, this.variant.id!, this.fileUploadAltText).subscribe(response => {
        if (response.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Datoteka spremljena.")
          this.resetFileUpload();
          this.getVariantImages();
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

  public closeDialog($refresh: boolean): void {
    this.closeDialogEmitter.emit($refresh);
  }

  public isFormInvalid(): boolean {
    if (!this.formGroup.valid) {
      return true;
    }

    return false;
  }

  public saveChanges(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.postProductVariant(this.variant).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.closeDialog(true);
          this.uiService.showSuccess("Varijanta uspješno spremljena.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja varijante.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja varijante.");
    }
  }

  public saveImageSettingsChanges(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.postVariantImageSettings(this.selectedImage).subscribe(res => {
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
