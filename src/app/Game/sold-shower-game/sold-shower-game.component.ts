import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-sold-shower-game',
  templateUrl: './sold-shower-game.component.html',
  styleUrls: ['./sold-shower-game.component.css']
})
export class SoldShowerGameComponent implements OnInit {
  @Input()
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private auth: AuthenticationService,
    private iab: InAppBrowser
  ) {
  }

  ngOnInit(): void {
    this.updateCompte();
  }


  async saveToUserData(user: any) {
    //  console.log(user);
    if (user != null && user != undefined) {
       this.user.firstName = user.firstName;
       this.user.lastName  = user.lastName;
       this.user.hcompte   = user.hcompte;
       this.user.compte    = user.compte;
       this.user.hbonus    = user.hbonus;
       this.user.bonus     = user.bonus;
       this.user.htickets  = user.htickets;
       this.user.tickets   = user.tickets;
       await this.auth.setUserData(this.user);
    }

 }

 updateCompte() {
      this.app.getData(`${environment.apiUrl}getUserInfoNow`).subscribe(
       (data) => {
          this.saveToUserData(data);
      }, (error) => {
        throw error;
     }
   );
 }

 goToKL() {
   const url:any = environment.server_kz+btoa(this.user.token)+'/game.payout';
   const browser = this.iab.create(url);
   browser.show();
 }


}
