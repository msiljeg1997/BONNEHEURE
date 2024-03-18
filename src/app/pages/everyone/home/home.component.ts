import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/api/api-response';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environment';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public baseUrl: string = environment.productImagesUrl;
  isMobile = window.innerWidth < 479;

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
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.setCanonicalURL('https://www.bonneheure.hr/home');
    this.itemService.refreshIfTimeout();
    window.scrollTo(0, 0);
  }

  setCanonicalURL(url: string) {
    let link: HTMLMetaElement | null = this.metaService.getTag('link[rel="canonical"]');
    if (!link) {
      this.metaService.addTag({ rel: 'canonical', href: url });
    } else {
      this.metaService.updateTag({ rel: 'canonical', href: url });
    }
  }

}
