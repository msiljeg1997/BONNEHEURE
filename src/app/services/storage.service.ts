import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private helperService: HelperService,
  ) { }

  public getUserToken(): string {
    let token = null;

    if (token = localStorage.getItem('token')) {
      return token;
    } else {
      token = sessionStorage.getItem('token');
    }

    return token ?? "";
  }

  public getUserUsername(): string | null {
    let username = null;

    if (username = localStorage.getItem('username')) {
      return username;
    } else {
      username = sessionStorage.getItem('username');
    }

    return username;
  }

  public getUserType(): string | null {
    let role_name = null;

    if (role_name = localStorage.getItem('role_name')) {
      return role_name
    } else {
      role_name = sessionStorage.getItem('role_name');
    }

    return role_name;
  }

  public isLoggedin(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    if (sessionStorage.getItem('token')) {
      return true;
    }
    
    return false;
  }

  public isAdmin(): boolean {
    let role_name = null;

    if (role_name = localStorage.getItem('role_name')) {
      if (role_name == 'Admin') {
        return true;
      }
    }

    if (role_name = sessionStorage.getItem('role_name')) {
      if (role_name == 'Admin') {
        return true;
      }
    }

    return false;
  }

  public getCartCode(): string {
    let cart_code = null;

    if (cart_code = localStorage.getItem('cart_code')) {
      return cart_code;
    }

    cart_code = this.helperService.randomHash(36);
    localStorage.setItem('cart_code', cart_code);

    return cart_code;
  }

  public clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
