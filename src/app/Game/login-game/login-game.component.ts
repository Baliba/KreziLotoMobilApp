import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';
import { AppService } from '../../_Services/app.service';
import { AuthenticationService } from '../../_Services/Authentification.service';

@Component({
  selector: 'app-login-game',
  templateUrl: './login-game.component.html',
  styleUrls: ['./login-game.component.css']
})
export class LoginGameComponent extends BaseComponent implements OnInit {

  public creds:any = {
    username : "",
    password : ""
  };
  dt: any;
  public returnUrl:any;
    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public app: AppService,
  ) {
     super();
    // redirect to home if already logged in
     if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/game/home']);
      }
      this.dt = localStorage.getItem("DEVICE_TYPE");
  }
  goQE() {

    window.location.href='https://www.quizeli.com/';
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game/home';
  }

   checkLog(){
     if(this.creds.username.length==8){
      this.creds.username="509"+this.creds.username;
     }
     this.login();
  }

   login() {
    this.loading[0] = true;
    this.authenticationService
      .login(this.creds.username.toLowerCase().trim(), this.creds.password)
      .pipe(first())
      .subscribe(
        (data: any) => {
         // console.log(data);
            this.loading[0] = false;
            if (!data.crash) {
               this.router.navigate([this.returnUrl]);
           } else {
            this.setAlert('alert-danger alert-login', data.message);
          }
        },
        error => {
            this.loading[0] = false;
            this.setAlert('alert-danger alert-login', error);
        }
      );
  }
}
