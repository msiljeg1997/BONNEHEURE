import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  public email: string = "";

  public validateEmail: boolean = false;

  constructor(
    private uiService: UiService,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  public resetPassword(): void {
    if (!this.email || !(this.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))) {
      this.uiService.showWarn("Molimo upišite valjanju e-mail adresu.");
      return;
    }

    this.uiService.countRequestUp();

    try {
      this.apiService.resetPassword(this.email).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Provjerite vašu e-mail adresu, te pratite upute.");
          this.router.navigate(['/login']);
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Greška prilikom resetiranja lozinke.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Pogreška prilikom resetiranja lozinke.");
    }
  }

}
