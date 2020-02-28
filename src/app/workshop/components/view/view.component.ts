import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Workshop, WorkshopQuery } from '../../+state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { slideInY } from '../../../ui/animations';
import { ToastrService } from 'ngx-toastr';
import { StepStore, Step } from 'src/app/step/+state';

const slideIn = trigger('slideIn', [
  transition(':enter', [
    queryChild('a', [stagger(30, slideInY)])
  ])
]);
@Component({
  selector: 'workshop-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn]
})
export class WorkshopViewComponent implements OnInit {
  workshop$: Observable<Workshop>;
  currentIndex$: Observable<number>;

  constructor(
    private query: WorkshopQuery,
    private router: Router,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private stepstore:StepStore
  ) {}

  ngOnInit() {

    this.toastr.clear(); // clear all notifications
    console.log("view");
    this.workshop$ = this.query.selectActive();
    this.workshop$.subscribe((workshop) => { 
      this.stepstore.remove(); 
      if(workshop){
      workshop.steps.map((step,index)=>{
        this.stepstore.upsert(index,step);
      });
    }
    })
  }

  getname(step:Step){
    return step.name.replace(/_/g, ' ')
  }

  start() {
    console.log("start");
    const id = this.query.getActiveId();
    this.router.navigate(['../steps/0'], { relativeTo: this.routes });
  }
}
