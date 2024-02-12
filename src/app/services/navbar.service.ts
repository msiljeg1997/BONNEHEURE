import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  menuItems: MenuItem[] = [];

  itemLogin: MenuItem[] = [
    {
      icon: 'pi pi-user',
      label: 'Prijava',
      routerLink: '/login'
    },
  ]

  itemsDefault: MenuItem[] = [
    {
      label: 'Početna',
      routerLink: '/home',
      icon: 'pi pi-home',
    },
    {
      label: 'Proizvodi',
      routerLink: '/products',
      icon: 'pi pi-list',
    },
    {
      label: 'O nama',
      routerLink: '/about_us',
      icon: 'pi pi-info-circle',
    },
    {
      expanded: true,
    },
  ];

  itemsUser: MenuItem[] = [  
    {
      icon: 'pi pi-user',
      label: 'Moj profil',
      items: [
        {
          label: 'Košarica',
          routerLink: '/cart',
          icon: 'pi pi-shopping-cart',
        },
        {
          separator: true
        },
        {
          label: 'Narudžbe',
          routerLink: '/user-orders',
          icon: 'pi pi-list',
        },
        {
          separator: true
        },
        {
          label: 'Postavke',
          routerLink: '/user-settings',
          icon: 'pi pi-cog',
        },
        {
          separator: true
        },
        {
          label: 'Odjava',
          command: () => this.logout(),
          icon: 'pi pi-sign-out',
        },
      ]
    },
  ]

  itemsAdmin: MenuItem[] = [
    {
      label: 'Upravljanje',
      items: [
        {
          label: 'Narudžbe',
          routerLink: '/admin-order-management'
        },
        {
          separator: true
        },
        {
          label: 'Kategorije proizvoda',
          routerLink: '/admin-group-management'
        },
        {
          separator: true
        },
        {
          label: 'Atributi',
          // routerLink: '/admin-group-management'
        },
        {
          separator: true
        },
        {
          label: 'Proizvodi',
          routerLink: '/admin-product-management'
        },
        {
          separator: true
        },
        {
          label: 'Korisnici',
          routerLink: '/admin-user-management'
        },
        {
          separator: true
        },
        {
          label: 'Logovi',
          routerLink: '/admin-log-management'
        },
        {
          separator: true
        },
        {
          label: 'Kongres predavači',
          routerLink: '/admin-kongres-management',
        },
        {
          separator: true
        },
        {
          label: 'Kongres radionice',
          routerLink: '/admin-kongres-radionice',
        },
      ]
    },
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {
    if (!this.storageService.isLoggedin()) {
      this.setMenuDefault();
    } else {
      if (this.storageService.isAdmin()) {
        this.setMenuAdmin();
      } else {
        this.setMenuUser();
      }
    }
  }

  public setMenuAdmin() {
    this.menuItems = [];
    this.menuItems = this.itemsDefault.concat(this.itemsUser, this.itemsAdmin);
  }

  public setMenuUser() {
    this.menuItems = [];
    this.menuItems = this.itemsDefault.concat(this.itemsUser);
  }

  public setMenuDefault() {
    this.menuItems = [];
    this.menuItems = this.itemsDefault.concat(this.itemLogin);
  }

  public logout(): void {    
    localStorage.clear();
    sessionStorage.clear();
    this.setMenuDefault();
    
    this.router.navigate(['/login']);
  }
  
}
