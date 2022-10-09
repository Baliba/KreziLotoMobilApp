import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_Services/Authentification.service';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if (currentUser.role.name === 'SELLER' || currentUser.role.name === 'MASTER' || currentUser.role.name === 'ADMIN' ) {
                return true;
              }  else if (currentUser.role.name === 'CLIENT' ) {
                this.router.navigate(['/game/home']);
            }
        }
        this.router.navigate(['/seller/login'] , { queryParams: { returnUrl: state.url } });
        return false;

  }

}
