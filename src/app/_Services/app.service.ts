import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AppService {

 constructor(private http: HttpClient) {

  }


  getData(url: string) {
    return this.http.get<any>(url).pipe(
      map((rep) => {
        return rep;
      })
    );
  }

  getDataJson(url: string) {
    return this.http.get<any>(url).pipe(
      map((rep) => {
        return [rep.crash,rep.message,rep.data.json()];
      })
    );
  }

  delData(url: string) {
    return this.http.delete<any>(url).pipe(
      map((rep) => {
        return rep;
      })
    );
  }

  setData(url: string, data: any) {
    return this.http.post<any>(url, data).pipe(
      map((rep) => {
        return rep;
      })
    );
  }

  editData(url: string, data: any) {
    return this.http.patch<any>(url, data).pipe(
      map((rep) => {
        return rep;
      })
    );
  }

  upload(url: string, file: File): Observable<HttpEvent<{}>> {
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data",
    });
    const data: FormData = new FormData();
    data.append("file", file);
    const req = new HttpRequest("POST", url, data, {
      reportProgress: true,
    });
    req.clone({ headers });
    return this.http.request(req);
  }


}
