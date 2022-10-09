import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/BaseComponent';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: 'app-no-credit',
  templateUrl: './no-credit.component.html',
  styleUrls: ['./no-credit.component.css']
})
export class NoCreditComponent extends BaseComponent implements OnInit {


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public app: AppService, ) {
super();
 }
lloading: any;
msg: any;
ngOnInit(): void {
  const r = this.route.snapshot.paramMap;
  this.msg = r.get("message");
}

}
