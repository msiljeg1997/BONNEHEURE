import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/components/ui/ui.service';
import { OrderHeader } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {

  public orders: OrderHeader[] = [];

  public selectedOrder: OrderHeader = new OrderHeader();

  public displayOrderDetails: boolean = false;

  constructor(
    private apiService: ApiService,
    private uiService: UiService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.uiService.countRequestUp();

    this.orders = [];

    try {
      this.apiService.getOrders().subscribe(res => {
        if (res.status == "OK") {
          this.orders = res.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata narudžbi.");
        }
      });
    } catch (error) {
      this.orders = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata narudžbi.");
    }
  }

  public toggleOrderDetails($order: OrderHeader | null = null): void {
    if ($order != null) {
      this.selectedOrder = this.helperService.deepCopy($order);
    }

    this.displayOrderDetails = !this.displayOrderDetails;
  }

}
