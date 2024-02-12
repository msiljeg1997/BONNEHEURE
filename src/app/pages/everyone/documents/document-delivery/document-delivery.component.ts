import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-delivery',
  templateUrl: './document-delivery.component.html',
  styleUrls: ['./document-delivery.component.scss']
})
export class DocumentDeliveryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
