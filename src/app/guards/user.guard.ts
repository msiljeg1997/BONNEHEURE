import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router,
  ) {

  }

  canActivate(): boolean {
    let role_name = null;

    if (!(this.storageService.getUserToken()) || !(role_name = this.storageService.getUserType()) || (role_name != 'User' && role_name != 'Admin')) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
