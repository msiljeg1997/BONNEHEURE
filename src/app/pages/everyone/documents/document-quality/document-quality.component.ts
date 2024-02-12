import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-quality',
  templateUrl: './document-quality.component.html',
  styleUrls: ['./document-quality.component.scss']
})
export class DocumentQualityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
