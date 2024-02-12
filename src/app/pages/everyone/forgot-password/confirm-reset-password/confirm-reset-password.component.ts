import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.scss']
})
export class ConfirmResetPasswordComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  private hash: string = "";
  private username: string = "";
  public password: string = "";
  public confirm_password: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private uiService: UiService,
    private router: Router,
  ) {
    this.hash = this.activatedRoute.snapshot.paramMap.get('hash') ?? "";
    this.username = this.activatedRoute.snapshot.paramMap.get('username') ?? "";
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  public confirmResetPassword(): void {
    if (this.password.length < 8) {
      this.uiService.showWarn('Lozinka mora sadržavati bar 8 znakova.');
      return;
    }

    if (this.password != this.confirm_password) {
      this.uiService.showWarn('Lozinke se ne podudaraju.');
      return;
    }

    if (this.hash.length < 30 && this.username.length < 5) {
      this.uiService.showError("Greška kod pokušaja resetiranja lozinke. Molim pokušajte ponovno.");
      this.router.navigate(['/forgot_password'])
      return;
    }

    this.uiService.countRequestUp();

    try {
      this.apiService.confirmResetPassword(this.hash, this.username, this.password).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Uspjeh. Lozinka resetirana. Prijavite se.");
          this.router.navigate(['/login']);
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Greška prilikom resetiranja. Pokušajte ponovno.");
          this.router.navigate(['/forgot_password'])
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Pogreška prilikom resetiranja. Pokušajte ponovno.");
      this.router.navigate(['/forgot_password'])
    }
  }

}
