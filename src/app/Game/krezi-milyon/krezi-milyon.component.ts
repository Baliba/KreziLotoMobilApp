import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-krezi-milyon',
  templateUrl: './krezi-milyon.component.html',
  styleUrls: ['./krezi-milyon.component.css']
})
export class KreziMilyonComponent extends BaseComponent implements OnInit {
  km: any;
  kmt: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private datePipe: DatePipe,
   ) {
    super();
   }

  ngOnInit(): void {
    this.getKm();
  }

  public getKm() {
    this.app.getData(`${environment.apiUrl}krezimilyon`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.km = data.data;
        this.getKmTicket();
      },
      (error) => {}
    );
  }

  convertDate(km: String) {
     let date = km.split(" ")[0];
     let d = date.split('-');
     return d[2]+'-'+d[1]+'-'+d[0];
   }

  public getKmTicket() {
    // let fin = this.datePipe.transform(this.km.fn.split(" ")[0], 'yyyy-MM-dd');
    // let debut = this.datePipe.transform(this.km.deb.split(" ")[0], 'yyyy-MM-dd');

    let fin = this.convertDate(this.km.fn);
    let debut = this.convertDate(this.km.deb);

    this.app.getData(`${environment.apiUrl}getMyKMTicket/${debut}/${fin}`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.kmt = data.data;
        console.log(data.data);
      },
      (error) => {}
    );
  }

}
