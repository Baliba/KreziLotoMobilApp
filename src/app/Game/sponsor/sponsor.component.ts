import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { BaseComponent } from 'src/app/BaseComponent';
import { environment } from 'src/environments/environment.prod';
import { AppService } from '../../_Services/app.service';
import { AuthenticationService } from '../../_Services/Authentification.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent extends BaseComponent implements OnInit {
  ucs: any = [];
  page = 0;
  user: any;
  state: any = 0;
  debut : any ;
  fin: any;
  constructor(private app: AppService,  private auth: AuthenticationService,private datePipe: DatePipe) {
    super();
    this.user = this.auth.currentUserValue;
  }

  onChange(e: any) {
    if (this.state==0) {
      this.getMyUcs();
    }
    this.ucs = [];
  }

  ngOnInit(): void {
    if (this.state==0) {
      this.getMyUcs();
    }
  }

   getMyUcs() {
    this.app.getData(`${environment.apiUrl}sponsors`)
    .pipe(first())
    .subscribe(
      (data) => {
       //  console.log(data);
        this.ucs = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getMyPastUcs() {
    if (this.debut!=undefined && this.fin!=undefined) {
      this.fin = this.datePipe.transform(this.fin, 'yyyy-MM-dd');
      this.debut = this.datePipe.transform(this.debut, 'yyyy-MM-dd');
      this.app.getData(`${environment.apiUrl}sponsors/${this.debut}/${this.fin}`)
        .pipe(first())
        .subscribe(
          (data) => {

            this.ucs = data.data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  payAgentNow(id: number, index: number) {
    if (!this.loading[id]){
      this.loading[id] = true;
      this.app.getData(`${environment.apiUrl}payAgentNow/${id}`)
        .pipe(first())
        .subscribe(
          (data) => {
            if (!data.crash) {
              this.ucs.splice(index, 1);
              this.saveToUser(data.data.agent_amount);
              this.setAlertSuccess(data.message, id);
            } else {
              this.setAlertDanger(data.message, id);
            }
            this.loading[id] = false;
          },
          (error) => {
            console.log(error);
            this.setAlertDanger(error, id);
            this.loading[id] = false;
          }
        );
  }
  }

  async  saveToUser(amount: any) {
    this.user.hcompte = parseInt(this.user.compte);
    this.user.compte += parseInt(amount);
    await this.auth.setUserData(this.user);
  }


}
