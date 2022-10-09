import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_Services/Authentification.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-float',
  templateUrl: './float.component.html',
  styleUrls: ['./float.component.css']
})
export class FloatComponent implements OnInit {
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

  openWhatsApp() {
    let host = (environment.production) ? "https://www.kreziloto.com/" : "http://" + environment.local + "/";
    window.location.href = `whatsapp://send?text=Map envitew vinn jwe bolèt sou KREZILOTO -\n ${host}game/register/${this.user.id} , ki se pi gro platfòm pou jwe bolèt anliy an ayiti, Nou gen jwèt Newyork ak Florida...Vinn jwe boul chans ou !!!.`;
   }
}
