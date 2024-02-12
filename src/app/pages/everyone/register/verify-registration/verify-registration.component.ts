import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/components/ui/ui.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify-registration',
  templateUrl: './verify-registration.component.html',
  styleUrls: ['./verify-registration.component.scss']
})
export class VerifyRegistrationComponent implements OnInit {
  private hash: string = "";

  txt: string = "Pričekajte trenutak...";

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private uiService: UiService,
    private router: Router,
  ) {
    this.hash = this.activatedRoute.snapshot.paramMap.get('hash') ?? "";
   }

  ngOnInit(): void {
    if (this.hash.length > 0) {
      this.verifyRegistration();
    } else {
      this.uiService.showError("Greška kod aktivacije računa. Molim pokušajte ponovno.");
    }
  }

  private verifyRegistration(): void {
    this.uiService.countRequestUp();
    
    try {
      this.apiService.verifyRegister(this.hash).subscribe(res => {
        if (res.status == "OK") {
          this.uiService.countRequestDown();
          this.txt = "Registracija uspješna, prijavite se";
          this.uiService.showSuccess("Uspjeh. Korisnički račun potvrđen. Prijavite se.");
          this.router.navigate(['/login']);
        } else {
          this.uiService.countRequestDown();
          this.txt = "Greška kod registracije. Pokušajte opet";
          this.uiService.showError("Greška prilikom potvrde. Pokušajte ponovno.");
        }
      });
    } catch (error) {
      this.uiService.countRequestDown();
      this.uiService.showError("Pogreška prilikom potvrde. Pokušajte ponovno.");
    }    
  }

}
