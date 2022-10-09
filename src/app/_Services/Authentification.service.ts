import { environment } from './../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_model/User';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public user: any;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.user = localStorage.getItem('currentUser');
    let data =JSON.parse(this.user);
    this.currentUserSubject = new BehaviorSubject<any>(data);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:typedef
  register(creds:any) {
    return this.http
      .post<any>(`${environment.apiUrl}register`, creds)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}login`, {
        username,
        password
      })
      .pipe(
        map(rep => {
          if (!rep.crash) {
            //  localStorage.setItem('currentUser', JSON.stringify(rep.data));
            //  this.currentUserSubject.next(rep.data);
              this.setUserData(rep.data);
          }
          return rep;
        })
      );
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
   setUserData(data: any){
     localStorage.setItem('currentUser', JSON.stringify(data));
     this.currentUserSubject.next(data);
   }
}
