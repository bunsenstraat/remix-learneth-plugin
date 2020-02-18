import { Injectable, Inject } from '@angular/core';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { Workshop } from '../+state';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private toastr:ToastrService
  ) { }

  async getAll() {
    this.toastr.info(`loading IDE client`,`loading`);
    //this.spinner.show();

    try{
      await this.remix.onload(()=>{this.spinner.hide()})
    }catch(err){
      this.spinner.hide();
      console.log(err);
    }
    // this.remix.onload().then(
     
    //     _=>{
    //       this.spinner.hide();
    //       this.toastr.success(`client loaded`,`client`);
    //       console.log('client loaded')
    //     }
        
    //   ).catch((error)=>{
    //     this.spinner.hide();
    //     this.toastr.error(`loading IDE client`,`loading`);
    //     console.log('client error')
    //   }
    //   );


  }

}
