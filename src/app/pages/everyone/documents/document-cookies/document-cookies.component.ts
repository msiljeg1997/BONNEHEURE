import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-cookies',
  templateUrl: './document-cookies.component.html',
  styleUrls: ['./document-cookies.component.scss']
})
export class DocumentCookiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
