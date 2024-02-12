import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { Log } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-log-management',
  templateUrl: './log-management.component.html',
  styleUrls: ['./log-management.component.scss']
})
export class LogManagementComponent implements OnInit {

  public logs: Log[] = [];

  constructor(
    private apiService: ApiService,
    private uiService: UiService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.uiService.countRequestUp();

    this.logs = [];

    try {
      this.apiService.getLogs().subscribe(res => {
        if (res.status == "OK") {
          this.logs = res.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata logoba.");
        }
      });
    } catch (error) {
      this.logs = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata logova.");
    }
  }

  public clearFilters($table: Table): void {
    $table.clear();
  }

}
