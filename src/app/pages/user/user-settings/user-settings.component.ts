import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styles: [`
    input {
      width: 25%;
      margin-bottom: 5px;
    }
    button{
      padding: 5px;
}
.container{
  display: inline-block;
}
form{
  width: 100%;
  display:inline-block;
  background-color: #F5F5F5;
  
}

  `]
})
export class UserSettingsComponent implements OnInit {
  nameSurname!: string;
  address!: string[];
  mobilePhone!: string;
  email!: string;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.nameSurname = '';
    this.address = [''];
    this.mobilePhone = '';
    this.email = '';
  }

  addAddress() {
    this.address.push('');
  }

  saveChanges() {
    const nameSurnameInput = document.getElementById('nameSurname') as HTMLInputElement;
    const mobilePhoneInput = document.getElementById('mobilePhone') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;

    this.nameSurname = nameSurnameInput.value;
    this.mobilePhone = mobilePhoneInput.value;
    this.email = emailInput.value;

    const addressInputs = document.querySelectorAll<HTMLInputElement>('#address');
    this.address = [];
    addressInputs.forEach((input) => {
      if (input.value !== '') {
        this.address.push(input.value);
      }
    });

    const data = {
      nameSurname: this.nameSurname,
      address: this.address,
      mobilePhone: this.mobilePhone,
      email: this.email,
    };

    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'userSettings.json');
    console.log(data);
  }

}