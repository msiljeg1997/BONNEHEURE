import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/components/ui/ui.service';
import { ProductCategory } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {
  formGroup = this.formBuilder.group({
    id: new FormControl("", [
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.maxLength(100),
    ]),
    order: new FormControl("", []),
    parent_category_id: new FormControl("", []),
  });

  @Input() display: boolean = false;

  @Input() isEditing: boolean = false;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  @Input() category!: ProductCategory;

  @Input() productCategories!: ProductCategory[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
  }

  public closeDialog(refresh: boolean): void {
    this.closeDialogEmitter.emit(refresh);
  }

  public saveChanges(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.postCategory(this.category).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.closeDialog(true);
          this.uiService.showSuccess("Kategorija uspješno spremljen.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja kategorije.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja kategorije.");
    }
  }

  public isFormInvalid(): boolean {
    if (!this.formGroup.valid) {
      return true;
    }

    return false;
  }

}
