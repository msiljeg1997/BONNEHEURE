import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-privacy-policy',
  templateUrl: './document-privacy-policy.component.html',
  styleUrls: ['./document-privacy-policy.component.scss']
})
export class DocumentPrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
