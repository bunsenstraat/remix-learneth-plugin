import { Component, Input, OnInit } from '@angular/core'
import { faArrowLeft, faHome, faBars, faAngleLeft, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StepQuery, Step, StepStore, StepService } from 'src/app/step/+state';
import { WorkshopQuery, Workshop } from 'src/app/workshop/+state';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  public arrowIcon = faArrowLeft
  public homeIcon = faHome
  public menuIcon = faBars
  public leftArrow = faChevronLeft
  public rightArrow = faChevronRight
  workshop$: Observable<Workshop>
  step$:Observable<Step>

  @Input() link: string
  @Input() showStep:string

  constructor(
    private stepQuery: StepQuery,
    private stepService:StepService,
    private workshopQuery: WorkshopQuery,
    private store:StepStore,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.step$ = this.stepQuery.selectActive()
    this.workshop$ = this.workshopQuery.selectActive()
  }

  previous() {
    this.store.update({ loading: true, success: false, error: null })
    const current = this.stepQuery.getActiveId()
    if (current !== 0) {
      this.stepService.loaded = false;
      this.router.navigate(['..', current - 1], { relativeTo: this.route })
    }
  }

  isLast(id: ID) {
    return this.stepQuery.getCount() - 1 == id
  }
  isFirst(id: ID) {
    return 0 == id
  }

  getname(step: Step) {
    return step.name.replace(/_/g, ' ')
  }

  async next() {
    try {
      this.store.update({ loading: true, success: false, error: null })
      const current = this.stepQuery.getActiveId()
      const isLast = this.stepQuery.getCount() === current + 1
      const path = isLast ? ['../../view'] : ['..', current + 1]
      if (!this.stepQuery.getActive().test && !isLast) {
        this.stepService.next()
      }
      console.log('go to', path, this.stepQuery.getCount(), isLast, current)
      this.stepService.loaded = false;
      await this.router.navigate(path, { relativeTo: this.route })
    } catch (err) {
      console.log('Cannot go next', err)
    }
  }

}
