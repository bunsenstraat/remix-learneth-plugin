import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { WorkshopQuery } from '../workshop/+state'
import { StepService, StepStore } from './+state'

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {
  constructor(
    private service: StepService,
    private store: StepStore,
    private workshopQuery: WorkshopQuery
  ) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    const { stepId } = next.params
    const index = parseInt(stepId, 10)
    const workshop = this.workshopQuery.getActive()
    const step = workshop.steps[stepId]
    await this.service.get(stepId, step)
    this.store.setActive(index)
    return true
  }
}
