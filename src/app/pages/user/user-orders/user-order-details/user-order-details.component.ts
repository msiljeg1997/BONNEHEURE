import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UiService } from 'src/app/components/ui/ui.service';
import { OrderHeader, OrderLine } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.scss']
})
export class UserOrderDetailsComponent implements OnInit {

  @Input() display: boolean = false;

  @Input() order!: OrderHeader;

  @Output() closeDialogEmitter = new EventEmitter();

  public orderLines: OrderLine[] = [];

  constructor(
    private apiService: ApiService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.uiService.countRequestUp();

    this.orderLines = [];

    try {
      this.apiService.getUserOrderLines(this.order.id!).subscribe(res => {
        if (res.status == "OK") {
          this.orderLines = res.data;
          window.scrollTo(0, 0);
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata narudžbi.");
        }
      });
    } catch (error) {
      this.orderLines = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata narudžbi.");
    }

  }

  public closeDialog(): void {
    this.closeDialogEmitter.emit();
  }

}
