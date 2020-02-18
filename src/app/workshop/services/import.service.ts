import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { github, WorkshopStore, WorkshopQuery, WorkshopState } from '../+state';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ToastrService, ToastRef } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http:HttpClient, private workshopstore:WorkshopStore, private workshopquery:WorkshopQuery, private toastr:ToastrService) { }

  import(github:github){
    const message = `${github.name}/${github.branch}`
    github.name = encodeURIComponent(github.name);
    const url = `http://49.12.14.220:3000/clone/${github.name}/${github.branch}`
    console.log(url);
    this.toastr.info(`loading ${message}`,`loading`);
    this.http.get(url).subscribe((content) => {
      console.log(content);
      github.data = content
      const initialState: Partial<WorkshopState> = content;
      this.workshopstore.set(initialState);
    },(error)=>{
    
      this.toastr.error(`loading ${message} : ${error.error}`,`error loading`);
    }
    
    
    
    );
  }

}
