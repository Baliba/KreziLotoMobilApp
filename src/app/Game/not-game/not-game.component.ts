import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-not-game',
  templateUrl: './not-game.component.html',
  styleUrls: ['./not-game.component.css']
})
export class NotGameComponent  extends BaseComponent implements OnInit {
  nots : any  = [];
  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {
    super();
   }

  ngOnInit(): void {
    this.getMyNots()
  }

  getMyNots() {
    this.app.getData(`${environment.apiUrl}moncash/getNotByUser`).subscribe(
      (data) => {
        console.log(data);
        this.nots = data.data;
      },
      (error) => {
        throw error;
      }
    );
  }

}
