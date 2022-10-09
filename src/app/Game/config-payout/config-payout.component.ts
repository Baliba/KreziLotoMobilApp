import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-config-payout',
  templateUrl: './config-payout.component.html',
  styleUrls: ['./config-payout.component.css']
})
export class ConfigPayoutComponent  extends BaseComponent implements OnInit {
  mc: any;
  pass: any;
  bank = { nom_bank: "", nom_compte: "", numero: "", swift: "", pass:""};
  user: any;
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {
    super();
    this.user = this.authenticationService.currentUserValue;

     }

  ngOnInit(): void {
    this.mc = this.user.moncashnumber;
    this.bank.nom_bank = this.user.nombank;
    this.bank.nom_compte = this.user.nomcompte;
    this.bank.numero = this.user.nocompte;
    this.bank.swift = this.user.swift;
  }

  saveMC() {

    if (this.mc != "" && this.mc.length == 8 || this.mc.length == 11) {
      let DATA = {
        moncash: this.mc,
        type_ud: 0,
        pass: this.pass
      };
      this.app.setData(`${environment.apiUrl}moncash/configPayment`, DATA).subscribe(
        (data) => {
          console.log(data);
          if (!data.crash) {
            this.saveToUser(data.data);
            this.pass = "";
            this.setAlert('alert-info alert-login', data.message, 1);
          } else {
            this.setAlert('alert-danger alert-login', data.message, 1);
          }
        },
        (error) => {
          this.setAlert('alert-danger alert-login', "Ere seve reeseye anko.", 1);
          throw error;
        }
      );
     } else {
      this.setAlert('alert-danger alert-login', "Nimewo an pa bon", 1);
    }

  }
  saveBK() {

    let DATA = {
      switf: this.bank.swift,
      nombank: this.bank.nom_bank,
      nomcompte: this.bank.nom_compte,
      nocompte: this.bank.numero,
      type_ud: 1,
      pass: this.bank.pass
    };
    this.app.setData(`${environment.apiUrl}moncash/configPayment`, DATA).subscribe(
      (data) => {
        console.log(data);
        if (!data.crash) {
          this.saveToUser(data.data);
          this.bank.pass = "";
          this.setAlert('alert-info alert-login', data.message, 2);
        } else {
          this.setAlert('alert-danger alert-login', data.message, 2);
        }
      },
      (error) => {
        this.setAlert('alert-danger alert-login', "Ere seve reeseye anko.", 2);
        throw error;
      }
    );

  }

  async  saveToUser(u : any) {
    this.user.moncashnumber = u.moncashnumber;
    this.user.swift = u.swift;
    this.user.nombank = u.nombank;
    this.user.nocompte = u.nocompte;
    this.user.nomcompte = u.nomcompte;
    await this.authenticationService.setUserData(this.user);
  }

}
