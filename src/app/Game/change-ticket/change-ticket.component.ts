import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-change-ticket',
  templateUrl: './change-ticket.component.html',
  styleUrls: ['./change-ticket.component.css']
})
export class ChangeTicketComponent extends BaseComponent implements OnInit {

  amount!: any;
  cp: any | undefined;
  depo = true;
  user: any;
  min=1;
  max = 5000;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private datePipe: DatePipe
  ) {
    super();
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.min = (this.user.username == "50938151294") ? 25 : 250;
  }



  makeChange() {
    if (this.depo) {
      if (this.amount >= this.min && this.amount<=this.max) {
        this.depo = false;
        //--------------| |-------------\\
        this.app.getData(`${environment.apiUrl}changeTicket/${this.amount}`)
          .pipe(first())
          .subscribe(
            (data) => {
              console.log(data);
              if (!data.crash) {
                this.setAlertSuccess(data.message, 1);
                this.amount = "";
                this.saveToUser(data.data);
                } else {
                let msg = (data.message) ? data.message : data.MESSAGE;
                this.setAlert('alert-danger alert-login', msg);
              }
               this.depo = true;
            },
            (error) => {
              this.depo = true;
              this.setAlert('alert-danger alert-login', "Erè seve reeseye anko.");
            });
        //-------------| |--------------\\
      } else {
        this.depo = true;
        this.setAlert('alert-danger alert-login', "Kantite tikè an la dwe konpri ant."+this.min+" & "+this.max+" ");
      }
    }

  }

  async  saveToUser(u : any) {
    this.user.compte = u.compte;
    this.user.hcompte = u.hcompte;
    this.user.tickets = u.tickets;
    this.user.htickets = u.htickets;
    await this.authenticationService.setUserData(this.user);
  }


}
