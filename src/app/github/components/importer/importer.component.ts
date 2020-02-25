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
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {
  infoIcon = faInfo;
  model:github;
  repos$:Observable<github[]>
  expanded:boolean = true;
  public sortDown = faCaretDown;
  public sortUp = faCaretUp;
  questionIcon = faQuestionCircle

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

  panelChange($event: NgbPanelChangeEvent, acc) {
      this.expanded = !acc.isExpanded($event.panelId);
  }
}
