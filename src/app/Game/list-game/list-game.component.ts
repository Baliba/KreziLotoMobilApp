import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { BaseComponent } from '../../BaseComponent';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent extends BaseComponent implements OnInit {
  @Input() user: any;
  @Input() toDay: any;
  @Input() gameSettings: any;
  @Input() games: any;
  @Output()
  pageEventLGame: EventEmitter<any> = new EventEmitter<any>();
  dateNow = new Date();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private datePipe: DatePipe
  ) {
    super();
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

  ngOnInit(): void {
    // console.log(this.gameSettings.games);
    this.setLuckyNumber();
  }

  see: any = [];
  formatGames(g:any) {
    let tg: any= [];
    for (let i = 0; i < g.length; i++) {
      if (tg.length==0) {
         tg.push({ cat: g[i].gamemaster.type_game, games: [g[i]], see:false, index: this.getIndexNow(g[i].gamemaster.type_game) });
       } else {
        let add = false;
        for (let j = 0; j < tg.length; j++) {
          if (tg[j].cat == g[i].gamemaster.type_game) {
              tg[j].games.push(g[i]);
              add = true;
              break;
          }
        }
        if (!add) {
          tg.push({ cat: g[i].gamemaster.type_game, games: [g[i]], see:false, index: this.getIndexNow(g[i].gamemaster.type_game)});
        }
      }
    }
    tg = tg.sort((a: any, b: any) => a.index - b.index);
    return tg;
  }

  getIndexNow(name: string) {
    let a = 1;
    switch (name) {
      case 'MATEN':
        a = 1;
        break;
      case 'MIDI':
        a = 2;
        break;
      case 'APREMIDI':
        a = 3;
        break;
      case 'SWA':
        a = 4;
        break;
    }
    return a;
  }



  setGame(game : any) {
    var data = { page: 2, data: game };
    this.pageEventLGame.emit(data);
  }


  goBack() {
    var data = { page: 0, data: undefined };
    this.pageEventLGame.emit(data);
  }

  getHour(h: string) {
    try {
      let nh = h.split(":");
      return this.getHT(nh[0],nh[1])
      } catch (e: any) {
      return "Byento";
    }
  }
  getHT(h: any, nh: any) {
    if (parseInt(h)==12) {
       return "Midi "+nh;
    }
    if (parseInt(h)>12) {
      return (parseInt(h)-12)+"H "+nh+" PM";
    }

    return h + "H "+nh+" AM";
  }
}
