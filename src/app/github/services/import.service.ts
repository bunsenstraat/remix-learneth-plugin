import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { WorkshopStore, WorkshopQuery, WorkshopState } from '../../workshop/+state';
import { github } from '../+state'
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GitHubQuery } from '../+state/github.query';
import { GitHubState, GitHubStore } from '../+state/github.store';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private githubquery:GitHubQuery, private githubstore:GitHubStore, private http:HttpClient, private workshopstore:WorkshopStore, private workshopquery:WorkshopQuery, private toastr:ToastrService, private spinner: NgxSpinnerService) { }

  import(github:github){
    const message = `${github.name}/${github.branch}`
    const githubname = encodeURIComponent(github.name);
    const url = `http://49.12.14.220:3000/clone/${githubname}/${github.branch}`
    console.log(url);
    this.spinner.show();
    const tid = this.toastr.info(`loading ${message}`,`loading`,{timeOut:0}).toastId;
    this.http.get(url).subscribe((content) => {
      console.log(content);
      
      const initialState: Partial<WorkshopState> = content;
      github = {...github, datemodified:initialState.datemodified, data:initialState}
      this.workshopstore.set(initialState);
      this.toastr.remove(tid);
      this.spinner.hide();
      this.addGitHubToStore(github);
    },(error)=>{
      this.spinner.hide();
      this.toastr.remove(tid);
      this.toastr.error(`loading ${message} : ${error.error}`,`error loading`,{timeOut:0});
    }
  
    
    );
  }

  addGitHubToStore(github:github){
    let searchitem; 
    console.log("search",github);
    this.githubquery.selectAll().subscribe(
      (githubs)=>{
        searchitem = githubs.filter(item=>(item.name == github.name && item.branch == github.branch))
      }
    )
    console.log(searchitem);
    if(searchitem.length==0){
      github = { ... github, id: uuid()};
      console.log("add ", github)
    }
    this.githubstore.upsert(github.id, {...github})
    this.githubstore.setActive(github.id)
  }


}
