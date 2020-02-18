import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { github } from '../../+state';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {
  public gitHubBranch = new FormControl('');
  public gitHubUrl = new FormControl('');

  constructor(private importservice:ImportService, private toastr: ToastrService) { }

  ngOnInit() {
    this.gitHubUrl.setValue(`ethereum/remix-workshops`);
    this.gitHubBranch.setValue('master');
  }
  sync() {
    let github:github = {name:this.gitHubUrl.value, branch:this.gitHubBranch.value}
    this.importservice.import(github);
  
  }
}
