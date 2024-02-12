import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-contact',
  templateUrl: './document-contact.component.html',
  styleUrls: ['./document-contact.component.scss']
})
export class DocumentContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
