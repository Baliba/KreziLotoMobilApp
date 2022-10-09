import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-hticket-game',
  templateUrl: './hticket-game.component.html',
  styleUrls: ['./hticket-game.component.css']
})
export class HTicketGameComponent implements OnInit {

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
    this.app.getData(`${environment.apiUrl}moncash/pastTicket/${this.day}`).subscribe(
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
