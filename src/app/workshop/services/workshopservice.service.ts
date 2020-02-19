import { Injectable, Inject } from '@angular/core';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { Workshop, WorkshopStore } from '../+state';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ID } from '@datorama/akita';

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
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr:ToastrService,
    private workShopStore:WorkshopStore
  ) { }


  toggleUIDescription(id: ID) {
    this.workShopStore.ui.upsert(id, entity => ({ isOpen: !entity.isOpen }));
  }

  async getAll() {
    this.toastr.info(`loading IDE client`,`loading`);
    //this.spinner.show();

    try{
      await this.remix.onload(()=>{this.spinner.hide()})
    }catch(err){
      this.spinner.hide();
      console.log(err);
    }



  }

}
