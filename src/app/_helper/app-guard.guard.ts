import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_Services/Authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const data = this.authenticationService.currentUserValue;
        if (data) {
           return true;
        }
        this.router.navigate(['/game/login'] , { queryParams: { returnUrl: state.url } });
        return false;

  }

}
