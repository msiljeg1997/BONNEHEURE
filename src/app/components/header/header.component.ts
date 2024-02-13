import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;


  constructor(
    public navbarService: NavbarService,
    public itemService: ItemService,
    public cartService: CartService,
  ) {
  }

  ngOnInit(): void {
  }




  menuItems = [
    {
        label: 'Trgovina',
        url: 'http://www.your-homepage-url.com'
    },
    {
        label: 'Kontakt',
        url: 'http://www.your-about-url.com'
    },
    {
        label: 'O nama',
        url: 'http://www.your-shop-url.com'
    }
];

}
