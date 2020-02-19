import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { WorkshopStore, WorkshopQuery, WorkshopState } from '../../workshop/+state';
import { github } from '../+state'
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http:HttpClient, private workshopstore:WorkshopStore, private workshopquery:WorkshopQuery, private toastr:ToastrService, private spinner: NgxSpinnerService) { }

  import(github:github){
    const message = `${github.name}/${github.branch}`
    const githubname = encodeURIComponent(github.name);
    const url = `http://49.12.14.220:3000/clone/${githubname}/${github.branch}`
    console.log(url);
    this.spinner.show();
    const tid = this.toastr.info(`loading ${message}`,`loading`,{timeOut:0}).toastId;
    this.http.get(url).subscribe((content) => {
      console.log(content);
      github = {...github, data:{...github.data, content}}
      const initialState: Partial<WorkshopState> = content;
      this.workshopstore.set(initialState);
      this.toastr.remove(tid);
      this.spinner.hide();
    },(error)=>{
      this.spinner.hide();
      this.toastr.remove(tid);
      this.toastr.error(`loading ${message} : ${error.error}`,`error loading`,{timeOut:0});
    }
  
    
    );
  }

}
