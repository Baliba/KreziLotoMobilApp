import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-profil-game',
  templateUrl: './profil-game.component.html',
  styleUrls: ['./profil-game.component.css']
})
export class ProfilGameComponent extends BaseComponent implements OnInit {
  user: any;
  fuser = {
    firstName: "",
    lastName: "",
    sex: "",
    phone: "",
    phone_b: "",
    adress: "",
    dob: ""
  };
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {
    super();
    this.user = this.authenticationService.currentUserValue;
    this.initformdata();
     }
  initformdata() {
    this.fuser.lastName = this.user.lastName;
    this.fuser.firstName = this.user.firstName;
    this.fuser.sex = this.user.sex;
    this.fuser.phone = this.user.phone;
    this.fuser.phone_b = this.user.phone_b;
    this.fuser.adress = this.user.adress;
    this.fuser.dob = this.user.dob;
  }

  ngOnInit(): void {
  }
  depo = true;
  save() {
    let d = this.validator();
    if (!d[0]) {
      this.setAlert('alert-danger alert-login', d[1]);
      return;
    }
    if (this.depo) {
      this.depo = false;
      this.app.setData(`${environment.apiUrl}updateProfil`, this.fuser).subscribe(
        (data) => {
          console.log(data);
          if (!data.crash) {
            this.saveToUser(data.data);
              this.setAlert('alert-info alert-login', data.message);
             } else {
              this.setAlert('alert-danger alert-login', data.message);
            }
          this.depo = true;
        },
        (error) => {
          this.depo = true;
          this.setAlert('alert-danger alert-login', "Ere seve reeseye anko.");
          throw error;
        }
      );
    }

  }

  validator() {
    if (this.fuser.firstName=="" || this.fuser.firstName.length<2 ) {
      return [false, "Non an pa dwe vid ou byen mwens ke 2 karakte "];
    }

    if (this.fuser.lastName=="" || this.fuser.lastName.length<2) {
      return [false, "Siyati an pa dwe vid ou byen mwens ke 2 karakte "];
    }

    if (this.fuser.sex=="") {
      return [false, "Sex an pa dwe vid "];
    }


    if (this.fuser.dob=="") {
      return [false, "Dat ou fet la pa dwe vid "];
    }

    return [true];
  }

  async  saveToUser(user : any) {
    let token = this.user.token;
    this.user = user;
    this.user.token = token;
    await this.authenticationService.setUserData(this.user);
    this.initformdata();
  }

}
