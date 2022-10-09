import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { AuthenticationService } from './_Services/Authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lotApp';
  user: any | undefined;
  isConnected = true;
  noInternetConnection: boolean | undefined;
  dt: any;
    constructor( private connectionService: ConnectionService, private router: Router,  private authenticationService: AuthenticationService ) {
      this.user = this.authenticationService.currentUserValue;
      this.dt = localStorage.getItem("DEVICE_TYPE");
      this.connectionService.monitor().subscribe(isConnected => {
        this.isConnected = isConnected;
        if (this.isConnected) {
          this.noInternetConnection = false;
         } else {
          this.noInternetConnection = true;
        }
      });
      this.onliners();
  }

  onliners() {

     this.router.events.subscribe((event: any) => {
          // if (event instanceof NavigationStart) {
          //     // Show loading indicator
          // }

          // if (event instanceof NavigationEnd) {
          //     // Hide loading indicator
          // }

          // if (event instanceof NavigationError) {
          //     // Hide loading indicator

          //     // Present error to user
          //     console.log(event.error);
          // }
      });
  }
}
