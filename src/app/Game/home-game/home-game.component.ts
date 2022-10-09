import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { DeviceDetectorService } from 'ngx-device-detector';
import { BaseComponent } from 'src/app/BaseComponent';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.component.html',
  styleUrls: ['./home-game.component.css']
})
export class HomeGameComponent  extends BaseComponent implements OnInit {
  @Input() user: any;
  @Input() toDay: any;
  @Input() gameSettings: any;
  @Input() games: any;
  @Input() draws:  Observable<any[]> | undefined;
  @Input() ydraws: Observable<any[]> | undefined;
  @Output()
  pageEventHome: EventEmitter<any> = new EventEmitter<any>();
  cNot = 0;
  newMan: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private datePipe: DatePipe,
    private deviceService: DeviceDetectorService
  ) {
    super();
    this.epicFunction();

    this.newMan = localStorage.getItem("NEW_USER");

  }

  closepup() {
    this.newMan = 1;
    localStorage.setItem("NEW_USER","1");
  }

  isMobile:any;

  epicFunction() {
    this.isMobile = this.deviceService.isMobile();
  }

  public countNotification() {
    this.app.getData(`${environment.apiUrl}countNotification`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.cNot = data;
      },
      (error) => {}
    );
  }
  msg: any = undefined;
  ngOnInit(): void {
    this.countNotification();
    this.setLuckyNumber();
    localStorage.setItem("NEW_USER", "1");
  }
  lucky:any = [];
  setLuckyNumber() {
    let ln: any = localStorage.getItem("LUCKY_NUMBERS");
    this.lucky = JSON.parse(ln);
    let date = localStorage.getItem("DATE_OF_THE_DAY");
    if (date != this.toDay || this.lucky.length==0) {
      localStorage.setItem("DATE_OF_THE_DAY", this.toDay);
      this.initNumbers();
    }
  }
  initNumbers() {
    let ln = [];
    for (let i = 0; i < 8; i++) {
      let num = this.getRandom(0,99).toFixed(0);
      ln.push(num);
    }
    this.lucky = ln;
    localStorage.setItem("LUCKY_NUMBERS", JSON.stringify(ln));
  }

  playNow() {
    var data = { page: 1, data: undefined };
    this.pageEventHome.emit(data);
  }

  getNot(not: any) {
    if (not<=99) {
      return not;
    }
    return "99+";
   }

   getUrl(){
     return this.msg ;
   }

  openWhatsApp() {
    let host = (environment.production) ? "https://www.kreziloto.com/" : "http://" + environment.local + "/";
    this.msg = `whatsapp://send?text=Map envitew vinn jwe bolèt sou KREZILOTO -\n ${host}game/register/${this.user.id} , ki se pi gro platfòm pou jwe bolèt anliy an ayiti, Nou gen jwèt Newyork ak Florida...Vinn jwe boul chans ou !!!.`;
     window.location.href = this.msg;
   }

  goToKeno() {
    window.location.href = environment.server_keno+btoa(this.user.token)
  }


  getMoney(m: String) {
    let n = "";
    for (let i = 0; i < m.length; i++) {
       if (i % 3 == 0) {
           n += ","
        }
       n += m[i];
    }
    return n;
  }



}
