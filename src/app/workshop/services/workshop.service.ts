import { Injectable, Inject } from '@angular/core';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { Workshop, WorkshopStore, LoadingStatus, WorkshopQuery } from '../+state';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ID } from '@datorama/akita';
import { environment } from 'src/environments/environment';
import YAML from 'yaml'
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
    private workShopStore:WorkshopStore,
    private query: WorkshopQuery,
    private store:WorkshopStore,
  ) { }

  toggleUIDescription(id: ID) {
    this.workShopStore.ui.upsert(id, entity => ({ isOpen: !entity.isOpen }));
  }

  getDescription(workshop){
    this.http.post(`${environment.apiUrl}getFile`, {file:workshop.description.file},{responseType:'text'}).subscribe(
      (content) => {         
        const storedworkshop = this.query.getEntity(workshop.id);  // get the entity out of the store because it might have changed   
        this.store.upsert(storedworkshop.id, { ...storedworkshop, text:content,description:{...storedworkshop.description , status:LoadingStatus.finished}});
      },response => {
        this.toastr.warning(workshop.description.file,'File not Loaded');
      }
  );
  }

  getMetaData(workshop){
    const metadata = [workshop.metadata].filter( meta => meta ).map( meta => 
      {
        this.http.post(`${environment.apiUrl}getFile`, {file:meta.file},{responseType:'text'}).subscribe(
          (content) => {     
            const storedworkshop = this.query.getEntity(workshop.id);  // get the entity out of the store because it might have changed   
            const newdata ={...storedworkshop, metadata: { ... storedworkshop.metadata, data:YAML.parse(content) }};
            this.store.upsert(workshop.id, newdata);
          },response => {
            this.toastr.warning(workshop.description.file,'File not Loaded');
          }
        );
      });
  }


}
