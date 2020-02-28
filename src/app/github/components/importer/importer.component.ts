import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { github } from '../../+state'
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { faInfo, faSortDown, faSortUp, faSortAlphaUp, faCaretUp, faCaretDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GitHubStore } from '../../+state/github.store';
import { GitHubQuery } from '../../+state/github.query';
import { Observable, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgbPanelChangeEvent, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { ID } from '@datorama/akita';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {
  infoIcon = faInfo;
  model:github;
  repos$:Observable<github[]>
  public sortDown = faCaretDown;
  public sortUp = faCaretUp;
  questionIcon = faQuestionCircle

  constructor(private importservice:ImportService, private toastr: ToastrService, private githubstore:GitHubStore, private githubquery:GitHubQuery) { }

  ngOnInit() {
    if(!this.githubstore._value().active)this.githubstore.setActive("1")
    
    this.githubquery.selectActive().subscribe( (github) => {
      this.model = {...github}
    })
    this.repos$ = this.githubquery.selectAll();
  }
  sync() {
    console.log("submit");

    this.importservice.import(this.model);

  }

  loadedGithub(){
    let activeModel:github
    this.githubquery.selectActive().subscribe( (github) => {
      activeModel = {...github}
    })
    return activeModel;
  }

  selectrepo(repo:github){
    console.log("select repo");
    this.importservice.import(repo);
  }

  panelChange() {
    this.toggleUI();
  }

  isOpen(acc:NgbAccordion) {
    let isOpen = true;
    if(typeof this.model!="undefined") this.githubquery.selectUIisOpenEntity(this.model.id).subscribe(val => isOpen = val||false);
    //if(acc)(isOpen)?acc.expand(`importerpanel`):acc.collapse(`importerpanel`);
    return isOpen;
  }

  
  toggleUI(){
    this.githubquery.setUIIsOpen(this.model.id)
  }

  gethelp(){
    return environment.help;
  }

  onChangeName(newValue:string) {
    console.log(newValue);
    if(newValue.includes('https://')){
      this.toastr.warning("Github name should be username/reponame","Bad github name")
    }
  }
  
}
