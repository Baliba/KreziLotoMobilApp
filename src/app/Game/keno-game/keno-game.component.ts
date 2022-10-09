import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-keno-game',
  templateUrl: './keno-game.component.html',
  styleUrls: ['./keno-game.component.css']
})
export class KenoGameComponent implements OnInit {

  cases: any = [];
  wh=0;
  game: any;
  user: any;
  play = false;
  show = false;
  error = false;
  nuser : any;
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {
      this.user = this.authenticationService.currentUserValue;
   }

  ngOnInit(): void {
  }

  me: any = "Ou pa gen ase kob bonis";
  getCurrentData() {

    if (!this.play && this.user.bonus>0) {
        this.play = true;
      this.app.getData(`${environment.apiUrl}tiraj/startGameNow`).subscribe(
        (data) => {
          console.log(data);
          if (!data.crash) {
            this.cases = this.shuffleArray(data.data.cases);
            this.wh = data.data.winHole;
            this.startGame();
            this.nuser = data.data.user;
          } else {
            this.error = true;
            this.me = data.message;
          }
        },
        (error) => {
          this.play = false;
          this.error = true;
          this.me = error;
          throw error;
        }
      );
    }
  }

  shuffleArray  (array : []) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
  startGame() {
    this.index = 1;
    this.timer();
  }
  tm: any;
  index = -1;
  turn = 0;
  s = 150;
  case: any;
  init() {
    this.tm  = undefined;
    this.index = -1;
    this. turn = 0;
    this.s = 150;
    this.case = undefined;
    this.show = false;
    this.cases = [];
    this.wh = 0;
    this.play = false;
    this.error = false;
  }
  keep() {
    if (this.index == 8) {
      this.index = 1;
      this.turn += 1;
      console.log("*** Turn  " + this.turn+"***");
    } else {
      this.index++;
    }
    this.timer();
    console.log(" | case  " + this.index+" |");
  }
  timer(){
    this.tm = setTimeout(() => {
      if (this.turn <= 3) {
        this.keep();
      } else  {
        if (this.cases[this.index-1].id == this.wh ) {
          this.case = this.cases[this.index - 1];
         // clearTimeout(this.tm);
          this.show = true;
          this.saveToUser(this.nuser);
         // console.log(" case "+this.index+" found  | |  " + this.wh + " == " + this.wh);
         // console.log(this.case);
        } else {
          this.keep();
        }
      }
    }, this.s + (this.turn*50));
  }

  async  saveToUser(u : any) {
    this.user.compte = u.compte;
    this.user.hcompte = u.hcompte;
    this.user.bonus = u.bonus;
    this.user.hbonus = u.hbonus;
    await this.authenticationService.setUserData(this.user);
  }

  goToKeno() {
    window.location.href = environment.server_keno+btoa(this.user.token)
  }



}
