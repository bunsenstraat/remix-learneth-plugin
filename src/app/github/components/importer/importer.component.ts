import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { github } from '../../+state'
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { GitHubStore } from '../../+state/github.store';
import { GitHubQuery } from '../../+state/github.query';
import { Observable, merge } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {
  infoIcon = faInfo;
  model:github;
  repos$:Observable<github[]>

  constructor(private importservice:ImportService, private toastr: ToastrService, private githubstore:GitHubStore, private githubquery:GitHubQuery) { }

  ngOnInit() {
    this.githubstore.setActive("1");
    this.githubquery.selectActive().subscribe( (github) => {
      this.model = {...github}
    })
    this.repos$ = this.githubquery.selectAll();
  }
  sync() {
    console.log("submit");

    this.importservice.import(this.model);
    let searchitem; 
    this.githubquery.selectAll().subscribe(
      (githubs)=>{
        searchitem = githubs.filter(github=>(github.name == this.model.name && github.branch == this.model.branch))
      }
    )
    if(searchitem.length==0){
      console.log("add ", this.model)
      this.githubstore.add(this.model)
    };
  
  
  }

  selectrepo(repo:github){
    this.importservice.import(repo);
  }

  onSubmit() { 
    
   }
}
