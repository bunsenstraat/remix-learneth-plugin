import { Component, OnInit } from '@angular/core';
import { WorkshopserviceService } from '../../services/workshop.service';
import { slideInY } from '../../../ui/animations';
import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { Observable, Subscription, of } from 'rxjs';
import { Workshop, WorkshopQuery, WorkshopStore, LoadingStatus } from '../../+state';
import { HttpClient } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ID } from '@datorama/akita';

import { environment } from 'src/environments/environment';

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
   
    this.toastr.clear(); // clear all notifications
    
    this.workshops$ = this.query.selectAll();
    this.subscription = this.workshops$.subscribe((workshops) => {
      

    workshops.filter(workshop=>workshop.description||false).
        filter(workshop=>workshop.description.file||false).
        filter(workshop=>(workshop.description.status==LoadingStatus.notloaded)||(!workshop.description.status)).
        map((workshop,index)=>{
        if(!this.tempStore.some(e => e === workshop.id)){
          this.tempStore.push(workshop.id);
          this.service.getDescription(workshop)
          this.service.getMetaData(workshop)
        }
      });
    });
  }

  getlevel(workshop:Workshop){
//    console.log("get level",workshop);
    return (workshop.metadata)?(workshop.metadata.data?workshop.metadata.data.level:false):false;
  }
  gettags(workshop:Workshop){
    return (workshop.metadata)?(workshop.metadata.data?workshop.metadata.data.tags:false):false;
  }
 
  isOpen(id: ID) {
    let isOpen = false;
    this.query.selectUIisOpenEntity(id).subscribe(val => isOpen = val||false);
    return isOpen;
  }

  
  toggleDescriptionUI(workshop:Workshop){
    this.query.setUIDescriptionIsOpen(workshop.id)
  }

  trackByFn(index: number, workshop: Workshop) {
    
    return workshop.id;
  }

}
