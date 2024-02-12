import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { UiService } from 'src/app/components/ui/ui.service';
import { User } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { UserTypesVar } from 'src/app/variables/userTypes';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  formGroup = this.formBuilder.group({
    username: new FormControl("", [
      Validators.required,
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email,
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
    ])
  });

  formGroupPassword = this.formBuilder.group({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirm_password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  @Input() display!: boolean;

  public displayChangePassword: boolean = false;

  @Input() user!: User;

  @Output() closeDialogEmitter = new EventEmitter<boolean>();

  public userTypes: SelectItem[] = UserTypesVar.USER_TYPES;

  public password?: string;
  public confirm_password?: string;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
  }

  public closeDialog(refresh: boolean): void {
    this.closeDialogEmitter.emit(refresh);
    this.formGroup.reset();
  }

  public saveChanges(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.editUser(this.user).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.closeDialog(true);
          this.uiService.showSuccess("Korisnik uspješno uređen.");
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

  public toggleChangePasswordDialog(): void {
    this.displayChangePassword = !this.displayChangePassword;
  }

  public changePassword(): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.changeUserPassword(this.user.id!, this.password!, this.confirm_password!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.toggleChangePasswordDialog();
          this.uiService.showSuccess("Korisnik uspješno uređen.");
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod promjene lozinke.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod promjene lozinke.");
    }
  }

  isFormInvalid(): boolean {
    if (!this.formGroup.valid) {
      return true;
    }

    return false;
  }

  isPasswordFormInvalid(): boolean {
    if (!this.formGroupPassword.valid) {
      return true;
    }

    return false;
  }

}
