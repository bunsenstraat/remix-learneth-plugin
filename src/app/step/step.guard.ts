import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { StepService, StepStore } from './+state';

import { WorkshopQuery } from '../workshop/+state';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {

  constructor(
    private service: StepService,
    private store: StepStore,
    private workshopQuery: WorkshopQuery,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    
    const { stepId } = next.params;
    const index = parseInt(stepId, 10);
    const workshop = this.workshopQuery.getActive();
    const currentStep = 0;
    const step = workshop.steps[stepId];
    this.store.setActive(index);
    await this.service.get(stepId, step);
    console.log('Guard', this.store, stepId, index, currentStep, workshop, step);
    
    return true;
    if (index > currentStep) {
      return false;
    } else {
      const step = workshop.steps[stepId];
      this.store.setActive(index);
      await this.service.get(stepId, step);
      return true;
    }
  }
}
