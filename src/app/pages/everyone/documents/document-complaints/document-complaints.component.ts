import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-complaints',
  templateUrl: './document-complaints.component.html',
  styleUrls: ['./document-complaints.component.scss']
})
export class DocumentComplaintsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
