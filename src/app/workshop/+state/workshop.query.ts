import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkshopStore, WorkshopState } from './workshop.store';
import { Workshop } from './workshop.model';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class WorkshopQuery extends QueryEntity<WorkshopState> {

  activeStep$ = this.selectActive().pipe(
    map((workshop) => {
      return workshop.steps[0];
    })
  );

  constructor(protected store: WorkshopStore) {
    super(store);
  }

  steps$ = this.selectActive().pipe(map(workshop => workshop.steps));

}
