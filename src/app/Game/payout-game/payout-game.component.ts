import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-payout-game',
  templateUrl: './payout-game.component.html',
  styleUrls: ['./payout-game.component.css']
})
export class PayoutGameComponent extends BaseComponent implements OnInit {

  public pay = {
    sold: "",
    type_pay: 0,
    pass: "",
    moncash: "",
    swift: "",
    nom_bank: "",
    nom_compte: "",
    numero: "",
    nom_complet: "",
    pin:""
  };
  user: any;
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {
    super();
    this.user = this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {
    this.pay.moncash = this.user.moncashnumber;
    this.pay.nom_bank = this.user.nombank;
    this.pay.nom_compte = this.user.nomcompte;
    this.pay.numero = this.user.nocompte;
    this.pay.swift = this.user.swift;
    this.pay.nom_complet = this.user.firstName + " " + this.user.lastName;
  }

  payout() {
    this.app.setData(`${environment.apiUrl}moncash/payout`, this.pay).subscribe(
      (data) => {
        console.log(data);
        if (!data.crash) {
          this.saveToUser(data.data.user);
          this.pay.sold = "";
          this.pay.pin = "";
          this.pay.pass = "";
          this.setAlert('alert-info alert-login', data.message, 1);
        } else {
          this.setAlert('alert-danger alert-login', data.message, 1);
        }
      },
      (error) => {
        this.setAlert('alert-danger alert-login', "Ere seve reeseye anko.", 2);
        throw error;
      }
    );
  }

  async  saveToUser(u : any) {
    this.user.compte = u.compte;
    this.user.hcompte = u.hcompte;
    await this.authenticationService.setUserData(this.user);
  }


}
