import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/components/ui/ui.service';
import { ProductImage } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-image-settings',
  templateUrl: './image-settings.component.html',
  styleUrls: ['./image-settings.component.scss']
})
export class ImageSettingsComponent implements OnInit {
  formGroup = this.formBuilder.group({
    default: new FormControl("", []),
    order: new FormControl("", [
      Validators.max(20),
    ]),
    alt_text: new FormControl("", [
      Validators.maxLength(250),
    ])
  });

  @Input() display: boolean = false;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  @Input() image!: ProductImage;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private uiService: UiService,
    ) { }

  ngOnInit(): void {
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

}
