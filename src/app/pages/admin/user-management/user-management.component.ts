import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { UiService } from 'src/app/components/ui/ui.service';
import { User } from 'src/app/models/api/api-response';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  public displayAddUserForm: boolean = false;
  public displayEditUserForm: boolean = false;

  public users: User[] = [];
  public selectedUser: User = new User();

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

    this.users = [];

    try {
      this.apiService.getUsers().subscribe(res => {
        if (res.status == "OK") {
          this.users = res.data;
          this.uiService.countRequestDown();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod dohvata korisnika.");
        }
      });
    } catch (error) {
      this.users = [];
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod dohvata korisnika.");
    }
  }

  public clearFilters($table: Table): void {
    $table.clear();
  }

  public toggleAddUserForm($isRefresh: boolean): void {
    this.displayAddUserForm = !this.displayAddUserForm;

    if ($isRefresh) {
      this.getData();
    }
  }

  public toggleEditUserForm($isRefresh: boolean, $selectedUser: User | null = null): void {
    if ($selectedUser != null) {
      this.selectedUser = this.helperService.deepCopy($selectedUser);
    }

    this.displayEditUserForm = !this.displayEditUserForm;

    if ($isRefresh) {
      this.getData();
    }
  }

  public deleteUser($user: User): void {
    this.uiService.countRequestUp();

    try {
      this.apiService.deleteUser($user.id!).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.uiService.showSuccess("Korisnik uspješno obrisan.");
    
          this.getData();
        } else {
          this.uiService.countRequestDown();
          this.uiService.showError("Pogreška kod brisanja korisnika.");
    
          this.getData();
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Greška kod brisanja korisnika.");
    
      this.getData();
    }
  }

  public toggleDeleteUserDialog($user: User): void {
    this.uiService.confirmDialog("Brisanje korisnika", "Jeste li sigurni da želite obrisati korisnika " + $user.username + "?", () => this.deleteUser($user));
  }
  
}
