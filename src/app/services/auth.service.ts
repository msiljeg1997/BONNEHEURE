import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { NavbarService } from './navbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private navbarService: NavbarService,
    private router: Router,
  ) { }

  public setUserToken($username: string, $token: string, $role_name: string, $remember_me: boolean): void {
    localStorage.clear();
    sessionStorage.clear();

    if ($remember_me) {
      localStorage.setItem('username', $username);
      localStorage.setItem('token', $token);
      localStorage.setItem('role_name', $role_name);
    } else {
      sessionStorage.setItem('username', $username);
      sessionStorage.setItem('token', $token);
      sessionStorage.setItem('role_name', $role_name);
    }

    if ($role_name == "Admin") {
      this.navbarService.setMenuAdmin();
    } else if ($role_name == "User") {
      this.navbarService.setMenuUser();
    } else {
      this.navbarService.setMenuDefault();
    }
  }

  public logout(): void {    
    localStorage.clear();
    sessionStorage.clear();
    this.navbarService.setMenuDefault();
    this.router.navigate(['/login']);
  }
}
