import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-hdepo-game',
  templateUrl: './hdepo-game.component.html',
  styleUrls: ['./hdepo-game.component.css']
})
export class HDepoGameComponent implements OnInit {
  pays:any = [];
  day = 7;
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {

   }

  onChange(event: any) {
    this.pays = [];
    this.getCurrentPayout();
  }
  ngOnInit(): void {
    this.getCurrentPayout();
  }

  getCurrentPayout() {
    this.app.getData(`${environment.apiUrl}moncash/pastDepot/${this.day}`).subscribe(
      (data) => {
        this.pays = data.data;
        console.log(data);
      },
      (error) => {
        throw error;
      }
    );
  }
}
