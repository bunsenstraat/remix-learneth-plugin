import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Step, StepQuery, StepService, StepStore } from '../+state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { UnitTestError } from '@remixproject/plugin';

@Component({
  selector: 'step-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepViewComponent implements OnInit {

  menuIcon = faBars;
  step$: Observable<Step>;
  success$: Observable<boolean>;
  errors$: Observable<UnitTestError[]>;
  isLoading$: Observable<boolean>;
  index$: Observable<number>;

  constructor(
    private service: StepService,
    private store: StepStore,
    private query: StepQuery,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("all ",this.query.getAll());
    
    this.step$ = this.query.selectActive().pipe(
      tap(_ => this.store.update({ success: false, error: null })),
      tap(step => this.service.displaySolidity(step))
    );
    this.success$ = this.query.select('success');
    this.errors$ = this.query.selectError<UnitTestError[]>();
    this.isLoading$ = this.query.selectLoading();
    this.index$ = this.query.selectActiveId(); 
  }

  test(step: Step) {
    this.service.testStep(step);
  }

  previous() {
     const current = this.query.getActiveId();
    if (current !== 0) {
      this.router.navigate(['..', current - 1], { relativeTo: this.route });
    } 
  }

  async next() {
     try {
      const current = this.query.getActiveId();
      const isLast = this.query.getCount() === current + 1;
      const path = isLast ? ['../../view'] : ['..', current + 1];
      if (!this.query.getActive().test && !isLast) {
        this.service.next();
      }
      await this.router.navigate(path, { relativeTo: this.route });
    } catch (err) {
      console.log('Cannot go next', err);
    } 
  }

}
