
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {

  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      if (e.id === e.id && e.url.includes('#')) {
        const start = e.url.indexOf('#');
        const fragment = e.url.substring(start + 1);
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
          // Remove the fragment from the URL
          this.router.navigate([], { fragment: undefined });
        }, 500);
      }
    });
  }
}