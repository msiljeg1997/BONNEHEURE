import { Component, Input, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/models/api/api-response';

@Component({
  selector: 'app-order-lines',
  templateUrl: './order-lines.component.html',
  styleUrls: ['./order-lines.component.scss']
})
export class OrderLinesComponent implements OnInit {

  @Input() orderLines!: OrderLine[];

  constructor() { }

  ngOnInit(): void {
  }

}
