import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-alert-game',
  templateUrl: './alert-game.component.html',
  styleUrls: ['./alert-game.component.css']
})
export class AlertGameComponent extends BaseComponent implements OnInit {

  token_order: any;
  error = false;
  success = false
  user: any;
  msg: any;
  dt: any;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private app: AppService,
    private router: Router ) {
      super();
    this.user = this.auth.currentUserValue;
    this.dt = localStorage.getItem("DEVICE_TYPE");
   }

  ngOnInit(): void {
    this.token_order = this.route.snapshot.queryParamMap.get('token_order');
    if (this.token_order != undefined && this.token_order != "") {
       this.setSoldNow();
     } else {
      this.goTo();
    }
  }
  setSoldNow() {
     this.success = false;
    this.error = false;
    this.app.getData(`${environment.apiUrl}moncash/addDepo/${this.token_order}`)
    .pipe(first())
    .subscribe(
      (data) => {
         if (!data.error) {
              this.saveToUser(data.amount);
              this.success = true;
          } else {
              this.error = true;
             if (data.code_error == 100) {
              this.msg = data.msg;
              this.goToHome();
             } else if (data.code_error == 401 || data.code_error == 402) {
               this.msg = data.msg;
            } else {
              this.msg = data.msg;
              this.goToHome();
           }
        }
      },
      (error) => {
        this.error = true;
        this.msg = error;
      }
    );
  }
 async  saveToUser(amount: any) {
    this.user.hcompte = parseInt(this.user.compte);
    this.user.compte += parseInt(amount);
    await this.auth.setUserData(this.user);
    this.goTo();
  }

   async  saveToUserData(user: any) {
     if(user!=null && user!=undefined){
        this.user.hcompte = user.hcompte;
        this.user.compte =  user.compte;
        this.user.hbonus  = user.hbonus;
        this.user.bonus = user.bonus;
        await this.auth.setUserData(this.user);
     }
     this.goTo();
  }
  
  goToHome() {
       this.app.getData(`${environment.apiUrl}getUserInfoNow`).subscribe(
        (data) => {
           
           this.saveToUserData(data);
       }, (error) => {
         throw error;
      }
    );
  }

  goTo(){
     this.router.navigate(["app","home"]);
  }

}
