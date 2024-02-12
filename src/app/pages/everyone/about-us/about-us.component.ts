import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  public assetsUrl: string = environment.assetImagesUrl;

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
