import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-proizvodi-only',
  templateUrl: './proizvodi-only.component.html',
  styleUrls: ['./proizvodi-only.component.scss']
})
export class ProizvodiOnlyComponent implements OnInit {
  constructor(public itemService: ItemService) { }



  ngOnInit(): void {
    this.itemService.refreshIfTimeout();
  }
}
