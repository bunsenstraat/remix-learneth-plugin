import { Injectable, Inject } from '@angular/core';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { Workshop } from '../+state';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/text'
  })
};


@Injectable({
  providedIn: 'root'
})
export class WorkshopserviceService {
  
  constructor(
    @Inject(REMIX) private remix: RemixClient,
    private http: HttpClient

  ) { }

  async getAll() {
    await this.remix.onload(()=>{console.log('client loaded')});
  }

}
