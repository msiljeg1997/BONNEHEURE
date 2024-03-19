import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environment';
import { RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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
  private renderer: Renderer2

  constructor(
    public itemService: ItemService,
    rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.setCanonicalURL('https://www.bonneheure.hr/home');
    this.itemService.refreshIfTimeout();
    window.scrollTo(0, 0);
  }

  setCanonicalURL(url: string) {
    let canonicalLinkElement = this.document.querySelector('link[rel="canonical"]');
    if (!canonicalLinkElement) {
      canonicalLinkElement = this.renderer.createElement('link');
      this.renderer.setAttribute(canonicalLinkElement, 'rel', 'canonical');
      this.renderer.appendChild(this.document.head, canonicalLinkElement);
    }
    this.renderer.setAttribute(canonicalLinkElement, 'href', url);
  }

}
