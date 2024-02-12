import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { SelectItem } from 'primeng/api';
import { UserTypesVar } from 'src/app/variables/userTypes';
import { User } from 'src/app/models/api/api-response';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {
  formGroup = this.formBuilder.group({
    username: new FormControl("", [
      Validators.required,
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirm_password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    role_id: new FormControl("", [
      Validators.required,
    ]),
    company_name: new FormControl("", []),
    first_name: new FormControl("", []),
    last_name: new FormControl("", []),
    phone_no: new FormControl("", []),
    discount_percentage: new FormControl("", [
      Validators.max(100),
    ]),
  });

  @Input() display: boolean;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  public user: User;

  public userTypes: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private uiService: UiService,
  ) {
    this.display = false;
    this.user = new User();
    this.userTypes = UserTypesVar.USER_TYPES;
  }

  ngOnInit(): void {
  }

  public closeDialog(refresh: boolean): void {
    this.closeDialogEmitter.emit(refresh);
  }

  public saveChanges(): void {
    this.uiService.countRequestUp();

    this.user.id = 0;

    try {
      this.apiService.postUser(this.user).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.closeDialog(true);
          this.uiService.showSuccess("Korisnik uspješno kreiran.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod spremanja korisnika.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod spremanja korisnika.");
    }
  }

  isFormInvalid(): boolean {
    if (!this.formGroup.valid || this.formGroup.value.password != this.formGroup.value.confirm_password) {
      return true;
    }

    return false;
  }

}
