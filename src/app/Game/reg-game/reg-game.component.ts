import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';
import { AppService } from '../../_Services/app.service';
import { AuthenticationService } from '../../_Services/Authentification.service';

@Component({
  selector: 'app-reg-game',
  templateUrl: './reg-game.component.html',
  styleUrls: ['./reg-game.component.css']
})
export class RegGameComponent extends BaseComponent  implements OnInit {
  creds = {
   username:"",
   email:"",
   pass_1:"",
   pass_2:"" ,
   password:"",
   lastName:"",
   firstName:'',
   id_parent:0
  };
  page = 0;
  reg = false;
  ok = false;
  ID: any;
  public returnUrl: any;

    constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    public app: AppService,
  ) {
     super();
    // redirect to home if already logged in
     if (this.auth.currentUserValue) {
        this.router.navigate(['/game/home']);
     }
  }

  ngOnInit(): void {
     this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game/welcome';
     const r = this.route.snapshot.paramMap;
     this.ID = Number(r.get("id"));
  }


  checker() {
    let reg = true;
    var emailCheck=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
       if(!emailCheck.test(this.creds.email)){
          this.setAlert('alert-danger alert-login',"Imel la pa bon");
          reg = false;
       }
       if(this.creds.pass_1.length<=3){
          this.setAlert('alert-danger alert-login',"Kòd sekrè an dwe plis ke 3 karaktè");
          reg = false;
       }
      if(this.creds.pass_1!=this.creds.pass_2){
          this.setAlert('alert-danger alert-login',"Kòd sekrè yo pa menm");
          reg = false;
      }
      if(this.creds.username.length!=8 && this.creds.username.length!=11){
          this.setAlert('alert-danger alert-login',"Telefòn nan pa bon");
          reg = false;
      }
      if(this.creds.username.length==8){
        this.creds.username="509"+this.creds.username;
      }
    return reg;
  }

  checkReg(){
    if(this.checker()){
      this.panelReg(true);
    }
  }

  checkRegFinal() {
    this.panelReg(false);
    if(this.checker()){
      this.register();
    }
  }

  panelReg(i: any) {
    this.reg = i;
  }


  register(){

    if (this.loading[0]) {
      return;
    }
      this.loading[0] = true;
      this.panelReg(false);
      this.creds.username = this.creds.username.trim();
      this.creds.email =    this.creds.email.toLowerCase().trim();
      this.creds.password = this.creds.pass_1;
      if(this.ID!=undefined && this.ID!=0 && this.ID!=null){
        this.creds.id_parent = this.ID;
      }
      this.app.setData(`${environment.apiUrl}register`, this.creds)
      .pipe(first())
      .subscribe(
        (data:any) => {
            this.loading[0] = false;
            if (!data.crash) {
               this.auth.setUserData(data.data);
               localStorage.setItem("WELCOME_BONIS","1");
               this.router.navigate([this.returnUrl]);
            } else {
            this.setAlert('alert-danger alert-login', data.message);
          }
        },
        (error:any) => {
            this.loading[0] = false;
            this.setAlert('alert-danger alert-login', error);
        }
      );
  }

  nextPageReg() {
  let reg = true;
   if(this.creds.username.length!=8 && this.creds.username.length!=11){
      this.setAlert('alert-danger alert-login',"Nimero an pa bon");
      reg = false;
   }
   if(this.creds.username.length==8){
     this.creds.username="509"+this.creds.username;
    }
    if(reg) {
      this.checkUserName();
    }
  }

  checkUserName() {
    this.loading[0] = true;
    this.app.getData(`${environment.apiUrl}isUserNameExist/${this.creds.username}`)
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

  setPage(i : number) {
    this.closeAlert();
    this.page = i;
  }

}
