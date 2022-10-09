import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-fpass',
  templateUrl: './fpass.component.html',
  styleUrls: ['./fpass.component.css']
})
export class FPassComponent extends BaseComponent implements OnInit {

  creds = {
    username:"",
    email:"",
    pass_1:"",
    pass_2:"" ,
    password:"",
    lastName:"",
    firstName:''
   };
  page = 0;
  pin: any;
  pass: any;
   public returnUrl: any;

     constructor(
     private route: ActivatedRoute,
     private router: Router,
     private auth: AuthenticationService,
     public app: AppService,
   ) {
      super();

   }

  ngOnInit(): void {
  }

  setPage(i : number) {
    this.closeAlert();
    this.page = i;
  }

  nextPageReg() {
    this.loading[0] = true;
    this.app.getData(`${environment.apiUrl}cpass/${this.creds.email}`)
    .pipe(first())
    .subscribe(
      (data:any) => {
        if (!data.crash) {
            this.setPage(1);
         } else {
          this.setAlert('alert-danger alert-login',data.message);
        }
        this.loading[0] = false;
      },
      (error: any) => {
          this.loading[0] = false;
          this.setAlert('alert-danger alert-login', error);
      }
    );
  }
  msg: any;
  newPass() {
    this.loading[0] = true;
    let DATA = {
      email: this.creds.email,
      pin: this.pin,
      pass:this.pass
    };
    this.app.setData(`${environment.apiUrl}newPassword/${this.creds.email}`, DATA)
    .pipe(first())
    .subscribe(
      (data:any) => {
        console.log(data);
        if (!data.crash) {
          this.msg = data.message;
          this.setPage(2);
         } else {
          this.setAlert('alert-danger alert-login',data.message);
        }
        this.loading[0] = false;
      },
      (error: any) => {
          console.log(error);
          this.loading[0] = false;
          this.setAlert('alert-danger alert-login', error);
      }
    );
  }


}
