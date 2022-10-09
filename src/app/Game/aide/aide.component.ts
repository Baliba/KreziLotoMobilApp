import { Component, OnDestroy, OnInit } from '@angular/core';
import { TawkService } from 'src/app/_Services/tawk.service';
import { BaseComponent } from '../../BaseComponent';
import { AuthenticationService } from '../../_Services/Authentification.service';

@Component({
  selector: 'app-aide',
  templateUrl: './aide.component.html',
  styleUrls: ['./aide.component.css']
})
export class AideComponent extends BaseComponent implements OnInit, OnDestroy {

  tawkId = "6137be93649e0a0a5cd5172f/1ff0s0t1d";
  user: any;


  constructor(private tawkService: TawkService,
             private authenticationService: AuthenticationService) {
      super();
      this.user = this.authenticationService.currentUserValue;
   }
  ngOnDestroy(): void {
    this.tawkService.SetChatVisibility(false);
  }

  ngOnInit(): void {
    this.tawkService.SetChatVisibility(true);
    this.tawkService.UpdateTawkUser(this.user);
  }

  save() {

  }

}
