import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-payment-security',
  templateUrl: './document-payment-security.component.html',
  styleUrls: ['./document-payment-security.component.scss']
})
export class DocumentPaymentSecurityComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
