import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Workshop, WorkshopQuery } from '../../+state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { slideInY } from '../../../ui/animations';
import { ToastrService } from 'ngx-toastr';
import { StepStore } from 'src/app/step/+state';

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
    console.log(this.query.getAll());
    (this.query.selectActive() as Observable<any>).pipe(map(item => console.log(item)));
    this.workshop$.subscribe((workshop) => { 
      this.stepstore.remove(); 
      workshop.steps.map((step,index)=>{
        this.stepstore.upsert(index,step);
      });
    })
    //this.currentIndex$ = this.query.selectActiveId().pipe(
    //  map(id => this.accountQuery.getStepIndex(id) + 1),  // Need +1 to make *ngIf works
    //);
  }

  start() {
    console.log("start");
    const id = this.query.getActiveId();
  //  this.accountService.startWorkshop(id);
    this.router.navigate(['../steps/0'], { relativeTo: this.routes });
  }
}
