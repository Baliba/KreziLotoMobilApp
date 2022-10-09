import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { BaseComponent } from '../../BaseComponent';
import { AuthenticationService } from '../../_Services/Authentification.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

   cart  = [];
   user :any;
   @Input()
   cNot: any;
   @Input()
   km: any;
   constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

     this.user = this.authenticationService.currentUserValue;

  }

  ngOnInit(): void {
  }

  getTK(n:number) {
    if (n<1000) {
      return n
    }
    if(n<1000000) {
      let r = (n / 1000);
      return Math.floor(r) + "K";
    }
    if (n>=1000000) {
      return  "1M+";
    }
    return n;
  }

}
