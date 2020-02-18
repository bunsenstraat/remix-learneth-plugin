import { Component, OnInit } from '@angular/core';
import { WorkshopserviceService } from '../../services/workshopservice.service';
import { slideInY } from '../../../ui/animations';
import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { Observable, VirtualTimeScheduler, Subscription } from 'rxjs';
import { Workshop, WorkshopQuery, WorkshopStore, WorkshopLoader, LoadingStatus } from '../../+state';
import { isNgTemplate } from '@angular/compiler';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { catchError } from 'rxjs/operators';
import { WorkshopViewComponent } from '../view/view.component';
import { ToastrService } from 'ngx-toastr';

import { NgxSpinnerService } from 'ngx-spinner';


const slideIn = trigger('slideIn', [
  transition(':enter', [
    queryChild('li', [stagger(30, slideInY)], { optional: true })
  ])
]);

const httpOptions = {
  
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [slideIn]
})

export class ListComponent implements OnInit {
  workshops$: Observable<Workshop[]>;
  tempStore:string[] = [];
  subscription:Subscription

  constructor(
    private service: WorkshopserviceService,
    private query: WorkshopQuery,
    private store:WorkshopStore,
    private http:HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    console.log("list");
    this.service.getAll();
    this.workshops$ = this.query.selectAll();
    this.subscription = this.workshops$.subscribe((workshops) => {
      workshops.filter(workshop=>workshop.description||false).filter(workshop=>workshop.description.file||false).filter(workshop=>(workshop.description.status==LoadingStatus.notloaded)||(!workshop.description.status)).map((workshop,index)=>{
      //    console.log("update object",workshop)
          this.store.upsert(workshop.id, { ...workshop, dump:`burp`,description:{...workshop.description, status:LoadingStatus.started}});
      });
      workshops.filter(workshop=>workshop.description||false).filter(workshop=>workshop.description.file||false).filter(workshop=>(workshop.description.status==LoadingStatus.started)).map((workshop,index)=>{
        
        if(!this.tempStore.some(e => e === workshop.id)){
          this.tempStore.push(workshop.id);
          this.http.post('http://49.12.14.220:3000/getFile', workshop,{responseType:'text'}).subscribe(
              (content) => {            
              //  console.log("http object",workshop);
              //  this.toastr.success(workshop.description.file,'File Loaded');
                this.store.upsert(workshop.id, { ...workshop, dump:content,description:{...workshop.description, status:LoadingStatus.finished}});
              },response => {
                  this.toastr.warning(workshop.description.file,'File not Loaded');
              }
            );
        }
        
      });
      //this.loadDescriptions();
      //console.log("workshops in",workshops);
      //console.log("tenp",this.tempStore);
    });
  }



  trackByFn(index: number, workshop: Workshop) {
    
    return workshop.id;
  }

}
