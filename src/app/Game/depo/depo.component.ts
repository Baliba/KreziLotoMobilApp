import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-depo',
  templateUrl: './depo.component.html',
  styleUrls: ['./depo.component.css']
})
export class DepoComponent extends BaseComponent implements OnInit {


  amount!: number;
  cp: any | undefined;
  depo = true;
  user: any;
  dt: any;
  frame: boolean = false;
  src: SafeResourceUrl | any;
  min=1;
  max = 50000;
  tuto: any;
  page = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private datePipe: DatePipe
  ) {
    super();
    this.user = this.authenticationService.currentUserValue;
   // console.log(this.user);
    this.dt = localStorage.getItem("DEVICE_TYPE");
  }

  ngOnInit(): void {
    this.min = (this.user.username == "50938151294") ? 1 : 100;
    this.tuto = localStorage.getItem("TUTO_DEPO");
    if (this.tuto==undefined || this.tuto==null ) {
        this.page = 1;
        localStorage.setItem("TUTO_DEPO","1");
    }
  }

  setPage(i:any) {
    this.page = i;
  }

  closeFrame() {
    this.frame = false;
  }

  goTo(DATA: any) {
  window.location.href = DATA[1];
  //   if (this.dt != 99 && false) {
  //     window.location.href = DATA[1];
  //   } else {
  //     this.src = DATA[1];
  //     this.frame = true;
  //     console.log(DATA[1]);
  //  }
  }

  makeDepo() {
    if (this.depo) {
      if (this.amount >= this.min && this.amount<=this.max) {
        this.depo = false;
         if (this.cp!="" && this.cp!=undefined) {
           this.cp = this.cp.toLowerCase().trim();
         }
        this.app.setData(`${environment.apiUrl}depotMoncash`, { sold: this.amount, cp : this.cp } )
          .pipe(first())
          .subscribe(
            (data) => {
              console.log(data);
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


