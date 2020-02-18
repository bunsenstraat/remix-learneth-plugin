import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImportService } from '../../services/import.service';
import { github } from '../../+state';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {
  
  model = {name:'ethereum/remix-workshops',branch:'master'}

  constructor(private importservice:ImportService, private toastr: ToastrService) { }

  ngOnInit() {

  }
  sync() {
    console.log("submit")

    this.importservice.import(this.model);
  
  }
  onSubmit() { 
    
   }
}
