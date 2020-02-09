import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StepStore, StepState } from './step.store';

@Injectable({ providedIn: 'root' })
export class StepQuery extends QueryEntity<StepState> {

  constructor(protected store: StepStore) {
    super(store);
  }
}
