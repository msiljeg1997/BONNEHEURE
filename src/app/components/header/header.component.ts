import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ScrollServiceService } from 'src/app/scroll-service.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {




  isMobile = window.innerWidth < 479;




  constructor(
    public navbarService: NavbarService,
    public itemService: ItemService,
    public cartService: CartService,
    private router: Router,
    private scrollService: ScrollServiceService,
    private authService: AuthService,

  ) {
  }
  ngOnInit() {
    if (this.authService.isAdminLoggedIn()) {
      this.menuItems.push({
        label: 'Upravljanje',
        command: () => {
          this.router.navigate(['/admin-product-management']);
        }
      });
    }

  }


  menuItems = [
    {
      label: 'Kontakt',
      command: () => {
        const element = document.querySelector('#footer');
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      label: 'O nama',
      command: () => {
        this.router.navigate(['/about_us']);
      }
    },
    {
      label: 'Proizvodi',
      command: () => {
        this.router.navigate(['/products-list']);
      }
    },
  ];


}