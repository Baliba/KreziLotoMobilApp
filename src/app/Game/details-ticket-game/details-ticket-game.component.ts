import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AppService } from '../../_Services/app.service';
import { BaseComponent } from '../../BaseComponent';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: 'app-details-ticket-game',
  templateUrl: './details-ticket-game.component.html',
  styleUrls: ['./details-ticket-game.component.css'],
})
export class DetailsTicketGameComponent extends BaseComponent implements OnInit {

  item: any;
  id: any;
  bloading = false;
  user : any;
  constructor(private app: AppService
    ,private route: ActivatedRoute,
    private router: Router,
    private   auth: AuthenticationService) {
    super();
      this.user = this.auth.currentUserValue;
    }

  ngOnInit(): void {
    const r = this.route.snapshot.paramMap;
    this.id = Number(r.get("id"));
    this.getTicketsById();
  }

  getTicketsById() {
    this.app.getData(`${environment.apiUrl}getTicketById/${this.id}`)
    .pipe(first())
    .subscribe(
      (data) => {
        this.item = data.data;
        this.getDrawById()
       console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  verify() {
    if (!this.bloading) {
      this.bloading = true;
      this.app.getData(`${environment.apiUrl}verify/${this.id}`)
        .pipe(first())
        .subscribe(
          (data) => {
            this.bloading = false;
            if (!data.data.crash && data.data.code==200) {
              if (data.data.ticket) {
                this.item = data.data.ticket;
                this.getDrawById();
              }
              this.setAlert('alert-info alert-login', data.data.msg);
              this.saveToUser(data.data.sold);
            } else {
              this.setAlert('alert-danger alert-login', data.data.msg);
            }
            console.log(data);
          },
          (error) => {
            this.bloading = false;
            console.log(error);
          }
        );
    }
  }

  async  saveToUser(amount: any) {
    this.user.hcompte = parseInt(this.user.compte);
    this.user.compte += parseInt(amount);
    await this.auth.setUserData(this.user);
  }
  tiraj: any;
  getDrawById() {
    if(this.item.id_tiraj!=null){
      this.app.getData(`${environment.apiUrl}tiraj/getDrawById/${this.item.id_tiraj}`)
        .pipe(first())
        .subscribe(
          (data) => {
            this.tiraj = data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

}
