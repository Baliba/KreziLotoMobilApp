import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Tiraj } from './_model/tiraj';
import { AppService } from './_Services/app.service';
// import Android from '../polyfills';



export abstract class BaseComponent {
  public alert = { state: '', message: '', active: false, pos: -1 };
  public loading: any[] = [];
  public bank:any
  public lang:any;
  Android: any;
  constructor() {
    this.setBankAndLang();
   }

   setBankAndLang(){
     let sb = sessionStorage.getItem("BANK");
     let sl = sessionStorage.getItem("LG");
     if(sb != undefined && sl!=undefined) {
       this.bank = JSON.parse(sb);
       this.lang = JSON.parse(sl);
    }
   }
 // tslint:disable-next-line:typedef
  public  setAlert(state: any, message: any, pos: number= 1){
    this.alert.state = state;
    this.alert.active = true;
    this.alert.message = message;
    this.alert.pos = pos;
  }
  public  closeAlert(){
    this.alert.active = false;
  }
   public  setAlertDanger( message: any, pos: number= 1){
    this.alert.state = 'alert-danger alert-login';
    this.alert.active = true;
    this.alert.message = message;
    this.alert.pos = pos;
  }

  public  getRandom(min :number , max: number) {
     return Math.random() * (max - min) + min;
  }

  public  setAlertSuccess( message: any, pos: number= 1) {
    this.alert.state = 'alert-success alert-login';
    this.alert.active = true;
    this.alert.message = message;
    this.alert.pos = pos;
  }

  public getWin3(t: Tiraj){
    return t.lot_0+t.lot_1+t.lot_2;
  }

  public getNum4(t: Tiraj){
     return t.lot_3+t.lot_4+t.lot_5+t.lot_6;
  }

  getRandomInt(min: any, max: any) : number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
