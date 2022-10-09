import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valider',
  templateUrl: './valider.component.html',
  styleUrls: ['./valider.component.css']
})
export class ValiderComponent extends BaseComponent implements OnInit {
  user: any;
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private app: AppService) {
    super();
    this.user = this.authenticationService.currentUserValue;
    if (this.user.valider == 1) {
          this.router.navigate(["game","home"]);
      }
     }

   ngOnInit(): void {
   }
  edit() {
    this.loading[0] = true;
    this.app.getData(`${environment.apiUrl}changeEmail/${this.user.email}`)
    .pipe(first())
    .subscribe(
      (data:any) => {
        if (!data.crash) {
          this.saveToEmail(data.data);
          this.setAlertSuccess(data.message,1)
         } else {
          this.setAlert('alert-danger alert-login',data.message,1);
        }
        console.log(data);
        this.loading[0] = false;
      },
      (error: any) => {
          this.loading[0] = false;
          this.setAlert('alert-danger alert-login', error);
      }
    );
  }

  resend() {
    this.loading[0] = true;
    this.app.getData(`${environment.apiUrl}resendEmail`)
    .pipe(first())
    .subscribe(
      (data:any) => {
        if (!data.ERROR) {
          this.setAlertSuccess(data.message,1)
         } else {
          this.setAlert('alert-danger alert-login',data.MESSAGE,1);
        }
        console.log(data);
        this.loading[0] = false;
      },
      (error: any) => {
          this.loading[0] = false;
          this.setAlert('alert-danger alert-login', error);
      }
    );
  }

  async  saveToEmail(email : any) {
    this.user.email = email;
    await this.authenticationService.setUserData(this.user);
  }

  async  saveToVal() {
    this.user.valider = 1;
    await this.authenticationService.setUserData(this.user);
  }
  pin: any;
  valider() {
    this.loading[0] = true;
    this.app.getData(`${environment.apiUrl}valider/${this.pin}`)
    .pipe(first())
    .subscribe(
      (data:any) => {
        if (!data.crash) {
          this.pin = "";
          this.setAlertSuccess(data.message,2)
          this.saveToVal();
         } else {
          this.setAlert('alert-danger alert-login',data.message,2);
        }
        this.loading[0] = false;
        console.log(data);
      },
      (error: any) => {
          this.loading[0] = false;
          this.setAlert('alert-danger alert-login', error,2);
      }
    );
  }

}
