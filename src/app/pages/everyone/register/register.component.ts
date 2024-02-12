import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  public email: string = "";
  public password: string = "";
  public username: string = "";
  public confirm_password: string = "";

  public validateEmail: boolean = false;

  constructor(
    private uiService: UiService,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  public register(): void {
    if (!this.password || this.password.length < 8) {
      this.uiService.showWarn("Lozinka mora sadržavati barem 8 zankova.");
      return;
    }

    if (!this.email || !(this.email.match("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"))) {
      this.uiService.showWarn("Molimo upišite valjanju e-mail adresu.");
      return;
    }

    if (!this.username || this.username.length < 5) {
      this.uiService.showWarn("Korisničko ime mora sadržavati barem 5 znakova.");
      return;
    }

    if (this.password != this.confirm_password) {
      this.uiService.showWarn("Lozinke se ne podudaraju.");
      return;
    }

    this.uiService.countRequestUp();

    try {
      this.apiService.register(this.email, this.password, this.username).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Provjerite vašu e-mail adresu, te aktivirajte račun.");
          this.router.navigate(['/login']);
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Greška prilikom registracije.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Pogreška prilikom registracije.");
    }
  }

}
