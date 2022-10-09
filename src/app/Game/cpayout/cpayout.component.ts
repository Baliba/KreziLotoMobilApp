import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-cpayout',
  templateUrl: './cpayout.component.html',
  styleUrls: ['./cpayout.component.css']
})
export class CPayoutComponent implements OnInit {
  pays: any = [];

  constructor( private authenticationService: AuthenticationService,
    private app: AppService) {

   }

  ngOnInit(): void {
    this.getCurrentPayout();
  }

  getCurrentPayout() {
    this.app.getData(`${environment.apiUrl}moncash/getCurrentPayout`).subscribe(
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
