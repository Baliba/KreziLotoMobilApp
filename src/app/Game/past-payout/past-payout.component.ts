import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-past-payout',
  templateUrl: './past-payout.component.html',
  styleUrls: ['./past-payout.component.css']
})
export class PastPayoutComponent implements OnInit {

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
    this.app.getData(`${environment.apiUrl}moncash/pastPayout/${this.day}`).subscribe(
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
