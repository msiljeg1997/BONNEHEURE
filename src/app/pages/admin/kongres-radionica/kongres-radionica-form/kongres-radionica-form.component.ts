import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/components/ui/ui.service';
import { KongresRadionica } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kongres-radionica-form',
  templateUrl: './kongres-radionica-form.component.html',
  styleUrls: ['./kongres-radionica-form.component.scss']
})
export class KongresRadionicaFormComponent {
  formGroup = this.formBuilder.group({
    id: new FormControl("", [
    ]),
    first_name: new FormControl("", [
      Validators.required,
      Validators.maxLength(250),
    ]),
    last_name: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    disabled: new FormControl("", [
      Validators.required
    ]),
    theme: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    theme_english: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    description_english: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ])
  });

  @Input() display: boolean = false;

  @Input() isEditing: boolean = false;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  @Input() predavac!: KongresRadionica;

  @Input() predavaci!: KongresRadionica[];

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
      this.apiService.postKongresRadionica(this.predavac).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.closeDialog(true);
          this.uiService.showSuccess("Predavač uspješno spremljen.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja predavača.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja predavača.");
    }
  }

  public isFormInvalid(): boolean {
    if (!this.formGroup.valid) {
      return true;
    }

    return false;
  }
}
