import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-returns',
  templateUrl: './document-returns.component.html',
  styleUrls: ['./document-returns.component.scss']
})
export class DocumentReturnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
