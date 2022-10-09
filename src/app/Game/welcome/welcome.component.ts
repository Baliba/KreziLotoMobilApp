import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent  extends BaseComponent implements OnInit {

  page: any = 0;
  imgs: any = ["ny.jpeg", "fl.jpeg", "go.jpeg", "tns.jpeg"];
  user: any;
  min: any;
  max: any;
  constructor(  private route: ActivatedRoute,
    private router: Router, private app: AppService,  private auth: AuthenticationService,private datePipe: DatePipe) {
    super();
    this.user = this.auth.currentUserValue;
  }

  ngOnInit(): void {
    this.min = (this.user.username == "50938151294") ? 1 : 50;
    this.max = 1000000;
    let wb = localStorage.getItem("WELCOME_BONIS");
    if (wb!="1") {
        this.router.navigate(['/game/home']);
    }
  }

  goTo(DATA: any) {
      // to uncomment
    localStorage.removeItem("WELCOME_BONIS");
    window.location.href = DATA[1];
  }

  quit() {
    if (confirm("Siw kite paj sa ou pap jwenn 50% bonis la anko, eskew dako?")) {
      this.router.navigate(['/game/home']);
      // to uncomment
      localStorage.removeItem("WELCOME_BONIS");
    }
  }

  depo: any= true;
  amount: any;
  cp: any;
    makeDepo() {
      if (this.depo) {
        if (this.amount >= this.min && this.amount<=this.max) {
          this.depo = false;
          this.cp = "wckl88";
           if (this.cp!="" && this.cp!=undefined) {
              this.cp = this.cp.toLowerCase().trim();
           }
          this.app.setData(`${environment.apiUrl}depotMoncash`, { sold: this.amount, cp : this.cp } )
            .pipe(first())
            .subscribe(
              (data) => {
                if (!data.crash) {
                  if (!data.body.ERROR) {
                    this.setAlertSuccess("Fon ti tann nou pral voyew sou moncash pou ka fe depo an ...");
                    this.goTo(data.body.DATA);
                  } else {
                    this.setAlert('alert-danger alert-login', data.body.MESSAGE);
                  }
                } else {
                  let msg = (data.message) ? data.message : data.MESSAGE;
                  this.setAlert('alert-danger alert-login', msg);
                 }
                 this.depo = true;
              },
              (error) => {
                this.depo = true;
                this.setAlert('alert-danger alert-login', "Ere seve reeseye anko.");
              });
        } else {
          this.depo = true;
          this.setAlert('alert-danger alert-login', "Kob la dwe konpri ant "+this.min+"G & "+this.max+"G");
        }
      }

    }

}
