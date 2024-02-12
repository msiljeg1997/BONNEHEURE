import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-payment',
  templateUrl: './document-payment.component.html',
  styleUrls: ['./document-payment.component.scss']
})
export class DocumentPaymentComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
