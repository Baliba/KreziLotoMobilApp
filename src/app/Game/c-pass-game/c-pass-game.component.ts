import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-c-pass-game',
  templateUrl: './c-pass-game.component.html',
  styleUrls: ['./c-pass-game.component.css']
})
export class CPassGameComponent extends BaseComponent implements OnInit {
  pass = { h: "", n: "", n2: "" };
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {
    super();
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
      let $POST = {
        hpass: this.pass.h,
        npass: this.pass.n
      }
      this.app.setData(`${environment.apiUrl}changePass`,$POST).subscribe(
        (data) => {
          console.log(data);
          if (!data.crash) {

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
    if (this.pass.h=="" ) {
      return [false, "Ansyen kod sekre  an pa dwe vid "];
    }

    if (this.pass.n==""  ||  this.pass.n.length<5) {
      return [false, "Nouvo kod sekre  an pa dwe vid ou byen mwens ke 5 karakte "];
    }

    if (this.pass.n2 != this.pass.n) {
      return [false, "Kod yo pa menm"];
    }

    return [true];
  }

}
