import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ScrollServiceService } from 'src/app/scroll-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  


  isMobile = window.innerWidth < 480;




  constructor(
    public navbarService: NavbarService,
    public itemService: ItemService,
    public cartService: CartService,
    private router: Router,
    private scrollService: ScrollServiceService
    
  ) {
  }

  ngOnInit(): void {
    
  }



  menuItems = [
        {
        label: 'Kontakt',
        command: () => {
        this.router.navigate(['/kontakt']);
      }
    },
    {
        label: 'O nama',
        command: () => {
        this.router.navigate(['/about']);
      }
    },
    {
      label: 'Proizvodi',
      command: () => {
        this.router.navigate(['/home'], { fragment: 'proizvodi' });
      }
    },
];


}
