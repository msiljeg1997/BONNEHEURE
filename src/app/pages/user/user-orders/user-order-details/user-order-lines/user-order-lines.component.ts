import { Component, Input, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/models/api/api-response';

@Component({
  selector: 'app-user-order-lines',
  templateUrl: './user-order-lines.component.html',
  styleUrls: ['./user-order-lines.component.scss']
})
export class UserOrderLinesComponent {

  @Input() orderLines!: OrderLine[];

  constructor() { }

  ngOnInit(): void {
  }


}
