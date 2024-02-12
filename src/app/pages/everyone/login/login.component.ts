import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  public email: string = "";
  public password: string = "";
  public rememberMe: boolean = true;

  constructor(
    private uiService: UiService,
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    ) { }

  ngOnInit(): void {
    this.cartService.getCart();
    window.scrollTo(0, 0);
  }

  public login(): void {
    if (!this.email || !this.password) {
      this.uiService.showWarn("Upišite e-mail i lozinku.");
      return;
    }

    this.uiService.countRequestUp();

    try {
      this.apiService.login(this.email, this.password).subscribe(res => {
        if (res.status == "OK") {
          this.authService.setUserToken(this.email, res.data.token!, res.data.role_name!, this.rememberMe);

          this.uiService.countRequestDown();

          this.router.navigate(['/products']);
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Greška prilikom prijave.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Pogreška prilikom prijave.");
    }
  }

}
