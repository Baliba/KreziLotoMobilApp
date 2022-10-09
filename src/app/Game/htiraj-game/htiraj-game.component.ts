import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-htiraj-game',
  templateUrl: './htiraj-game.component.html',
  styleUrls: ['./htiraj-game.component.css']
})
export class HTirajGameComponent implements OnInit {

  tickets:any = [];
  day = 7;
  see:any = [];
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {

   }

  onChange(event: any) {
    this.tickets = [];
    this.getCurrentPayout();
  }
  ngOnInit(): void {
    this.getCurrentPayout();
  }

  getCurrentPayout() {
    this.app.getData(`${environment.apiUrl}moncash/pastTiraj/${this.day}`).subscribe(
      (data) => {
        this.tickets = data.data;
        console.log(data);
      },
      (error) => {
        throw error;
      }
    );
  }

}
