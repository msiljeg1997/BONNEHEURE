import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { KongresRadionica } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-kongres-radionica',
  templateUrl: './kongres-radionica.component.html',
  styleUrls: ['./kongres-radionica.component.scss']
})
export class KongresRadionicaComponent {

  public predavaci: KongresRadionica[] = [];
  public selectedPredavac: KongresRadionica = new KongresRadionica();

  public displayEditPredavacForm: boolean = false;

  public isEditing: boolean = false;

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
      this.apiService.getKongresRadionice().subscribe(res => {
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

  public toggleEditKongresPredavacForm($isRefresh: boolean, $selectedPredavac: KongresRadionica | null = null): void {
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
    this.selectedPredavac = new KongresRadionica();

    this.isEditing = false;

    this.displayEditPredavacForm = !this.displayEditPredavacForm;
  }

  public deleteProduct($kongres_predavac: KongresRadionica): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteKongresRadionica($kongres_predavac.id!).subscribe(res => {
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

  public toggleDeleteKongresPredavacDialog($kongres_predavac: KongresRadionica): void {
    this.uiService.confirmDialog("Brisanje korisnika", "Jeste li sigurni da želite obrisati korisnika " + $kongres_predavac.first_name + ' ' + $kongres_predavac.last_name + "?", () => this.deleteProduct($kongres_predavac));
  }
}
