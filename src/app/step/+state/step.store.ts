import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Step } from './step.model';

export interface StepState extends EntityState<Step>, ActiveState<number> {
  errorCount: number;
  error: any[];
  success: boolean;
}

const initial: StepState = {
  ids: [],
  entities: {},
  active: null,
  loading: false,
  errorCount: 0,
  error: [],
  success: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'step' })
export class StepStore extends EntityStore<StepState> {

  constructor() {
    super(initial);
  }

}

