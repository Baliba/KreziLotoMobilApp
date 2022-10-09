
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { DatePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  user: any;
  draws:  Observable<any[]> | undefined;
  ydraws: Observable<any[]> | undefined;
  toDay: any = new Date();
  gameSettings: any = undefined;
  selectedGame: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private app: AppService,
    private datePipe: DatePipe
  ) {
    this.user = this.authenticationService.currentUserValue;
    this.toDay = this.datePipe.transform(this.toDay, 'dd-MM-yyyy');
  }

  ngOnInit(): void {
    this.setPageFromLocalStorage();
    this.getSettingGame();
    this.getTodayDraw();
    this.getYesterDayDraw();
  }
  setPageFromLocalStorage() {
     let e:any = localStorage.getItem('PAGE');
     if (e == undefined || e == "" || e == null) {
      this.games = 0;
      this.selectedGame = undefined;
     } else {
      e = JSON.parse(e);
      this.games = e.page;
      this.selectedGame = e.data;
    }
   }
  public getYesterDayDraw() {
    this.app.getData(`${environment.apiUrl}tiraj/getDrawYDay`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.ydraws = of(data);
       // console.log(data);
      },
      (error) => {}
    );
  }

  public getTodayDraw() {
    this.app.getData(`${environment.apiUrl}tiraj/getDrawsOfTheDay`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.draws = of(data);
         // console.log(data);
      },
      (error) => {}
    );
  }
  games: any;
  public getSettingGame() {
    this.app.getData(`${environment.apiUrl}getGameSetting`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.gameSettings = data;
       //console.log(data);
      },
      (error) => {}
    );
  }


  public goToPage(e: any) {
    // console.log(e);
    this.games = e.page;
    this.selectedGame = e.data;
    localStorage.setItem('PAGE', JSON.stringify(e));
  }

  goToHome() {
    this.games = 0;
    this.selectedGame = undefined;
    localStorage.setItem('PAGE', JSON.stringify({page:0,data:undefined}));
  }

}
