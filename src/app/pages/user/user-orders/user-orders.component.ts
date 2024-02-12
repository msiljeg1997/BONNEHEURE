import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/components/ui/ui.service';
import { OrderHeader } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  public orders: OrderHeader[] = [];

  public selectedOrder: OrderHeader = new OrderHeader();

  public displayOrderDetails: boolean = false;

  constructor(
    private apiService: ApiService,
    private uiService: UiService,
    private helperService: HelperService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.uiService.countRequestUp();

    this.orders = [];

    try {
      this.apiService.getUserOrders().subscribe(res => {
        if (res.status == "OK") {
          this.orders = res.data;
          window.scrollTo(0, 0);
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

  private repeatOrder($order: OrderHeader): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.postRepeatOrder($order.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.router.navigate(['/cart']);
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod ponavljanja narudžbe.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod ponavljanja narudžbe.");
    }
  }

  public repeatOrderDialog($order: OrderHeader): void {
    this.uiService.confirmDialog('Ponavljanje narudžbe.', 'Svi artikli koji su trenutno u košarici biti će obrisani. Jeste li sigurani da želite nastaviti?', () => this.repeatOrder($order));
  }

}
