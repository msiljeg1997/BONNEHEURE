import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { UiService } from './ui.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;
  
  constructor(
    public uiService: UiService,
    public confirmationService: ConfirmationService,
  ) {
    this.uiService.uiComponent = this;
   }

  ngOnInit(): void {
  }

}
