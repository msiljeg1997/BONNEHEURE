import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { KongresPredavac } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kongres-management',
  templateUrl: './kongres-management.component.html',
  styleUrls: ['./kongres-management.component.scss']
})
export class KongresManagementComponent {
  public predavaci: KongresPredavac[] = [];
  public selectedPredavac: KongresPredavac = new KongresPredavac();

  public displayEditPredavacForm: boolean = false;

  public isEditing: boolean = false;

  public baseUrl: string = environment.predavaciImagesUrl;

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

    this.predavaci = [];

    try {
      this.apiService.getKongresPredavaci().subscribe(res => {
        if (res.status == "OK") {
          this.predavaci = res.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata kategorija.");
        }
      });
    } catch (error) {
      this.predavaci = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata kategorija.");
    }
  }

  public toggleEditKongresPredavacForm($isRefresh: boolean, $selectedPredavac: KongresPredavac | null = null): void {
    if ($selectedPredavac != null) {
      this.selectedPredavac = this.helperService.deepCopy($selectedPredavac);
    }

    this.isEditing = true;

    this.displayEditPredavacForm = !this.displayEditPredavacForm;

    if ($isRefresh) {
      this.getData();
    }
  }

  public clearFilters($table: Table): void {
    $table.clear();
  }

  public toggleAddKongresPredavacForm(): void {
    this.selectedPredavac = new KongresPredavac();

    this.isEditing = false;

    this.displayEditPredavacForm = !this.displayEditPredavacForm;
  }

  public deleteProduct($kongres_predavac: KongresPredavac): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteKongresPredavac($kongres_predavac.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Kategorija uspješno obrisana.");

          this.getData();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod brisanja kategorije.");

          this.getData();
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod brisanja kategorije.");

      this.getData();
    }
  }

  public toggleDeleteKongresPredavacDialog($kongres_predavac: KongresPredavac): void {
    this.uiService.confirmDialog("Brisanje korisnika", "Jeste li sigurni da želite obrisati korisnika " + $kongres_predavac.first_name + ' ' + $kongres_predavac.last_name + "?", () => this.deleteProduct($kongres_predavac));
  }
}
