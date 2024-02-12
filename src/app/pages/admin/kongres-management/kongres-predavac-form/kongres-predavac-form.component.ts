import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/components/ui/ui.service';
import { KongresPredavac } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kongres-predavac-form',
  templateUrl: './kongres-predavac-form.component.html',
  styleUrls: ['./kongres-predavac-form.component.scss']
})
export class KongresPredavacFormComponent {
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
    title: new FormControl("", [
      Validators.required,
      Validators.maxLength(250)
    ]),
    text1: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    text1_english: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    text2: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    text2_english: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    text3: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    text3_english: new FormControl("", [
      Validators.required,
      Validators.maxLength(2000)
    ]),
    theme: new FormControl("", [
      Validators.required,
      Validators.maxLength(500)
    ]),
    theme_english: new FormControl("", [
      Validators.required,
      Validators.maxLength(500)
    ])
  });

  @Input() display: boolean = false;

  @Input() isEditing: boolean = false;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  @Input() predavac!: KongresPredavac;

  @Input() predavaci!: KongresPredavac[];

  @ViewChild('fileInput', { static: false }) public fileUploader!: ElementRef;

  private fileToUpload: any;

  public fileUploadAltText: string = "";

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
      this.apiService.postKongresPredavac(this.predavac).subscribe(res => {
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

  public onFileChange($event: any): void {
    if ($event.target.files.length > 0) {
      this.fileToUpload = $event.target.files[0];
    }
  }

  public uploadFile(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.uploadPredavacImage(this.fileToUpload, this.predavac.id!, this.fileUploadAltText).subscribe(response => {
        if (response.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Datoteka spremljena.")
          this.resetFileUpload();
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

}
