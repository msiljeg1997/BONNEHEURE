import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/api/api-response';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public baseUrl: string = environment.productImagesUrl;

  public responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    public itemService: ItemService,
  ) { }

  ngOnInit(): void {
    this.itemService.refreshIfTimeout();
    window.scrollTo(0, 0);
  }

}
