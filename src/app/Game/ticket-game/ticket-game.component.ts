
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AppService } from '../../_Services/app.service';

@Component({
  selector: 'app-ticket-game',
  templateUrl: './ticket-game.component.html',
  styleUrls: ['./ticket-game.component.css']
})
export class TicketGameComponent implements OnInit {
  tickets: any = [];
  see: any = [];
  constructor(private app: AppService) {

  }

  ngOnInit(): void {
    this.getMytickets();
  }
  getMytickets() {
    this.app.getData(`${environment.apiUrl}getMytickets`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.tickets = data.data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
