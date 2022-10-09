import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../_Services/Authentification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  // tslint:disable-next-line:typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
        if (currentUser.role.name === 'MASTER' || currentUser.role.name === 'ADMIN' ) {
            return true;
          }  else if (currentUser.role.name === 'CLIENT' ) {
            this.router.navigate(['/game/home']);
        }
    }
    this.router.navigate(['/admin/login'] , { queryParams: { returnUrl: state.url } });
    return false;
  }
}
