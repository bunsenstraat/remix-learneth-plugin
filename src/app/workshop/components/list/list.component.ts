import { Component, OnInit } from '@angular/core';
import { WorkshopserviceService } from '../../services/workshopservice.service';
import { slideInY } from '../../../ui/animations';
import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { Observable } from 'rxjs';
import { Workshop, WorkshopQuery } from '../../+state';

const slideIn = trigger('slideIn', [
  transition(':enter', [
    queryChild('li', [stagger(30, slideInY)], { optional: true })
  ])
]);

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [slideIn]
})

export class ListComponent implements OnInit {
  workshops$: Observable<Workshop[]>;
  
  constructor(
    private service: WorkshopserviceService,
    private query: WorkshopQuery,
  ) { }

  ngOnInit() {
    console.log("list");
    this.service.getAll();
    this.workshops$ = this.query.selectAll();
  }

  trackByFn(index: number, workshop: Workshop) {
    return workshop.id;
  }

}
