import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ID } from '@datorama/akita'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { UnitTestError } from '@remixproject/plugin'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Step, StepQuery, StepService, StepStore } from '../+state'

@Component({
  selector: 'step-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StepViewComponent implements OnInit {
  @ViewChild('errors', { static: false }) errorDiv: ElementRef
  @ViewChild('top', { static: false }) topDiv: ElementRef

  menuIcon = faBars
  step$: Observable<Step>
  success$: Observable<boolean>
  errors$: Observable<UnitTestError[]>
  isLoading$: Observable<boolean>
  index$: Observable<number>
  errorLoadingFile:boolean

  constructor(
    private service: StepService,
    private store: StepStore,
    private query: StepQuery,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.errorLoadingFile = false
    this.service.loaded = false
    console.log('all ', this.query.getAll())
    this.toastr.clear()
    this.step$ = this.query.selectActive().pipe(
      tap((_) => this.store.update({ success: false, error: null })),
      tap((step) => {
        if (!this.service.loaded) {
          this.loadfile(step)
          this.service.loaded = true
        }
      })
    )
    this.success$ = this.query.select('success')
    this.query.select('success').subscribe((r) => console.log('succes?', r))
    this.errors$ = this.query.selectError<UnitTestError[]>()
    this.isLoading$ = this.query.selectLoading()
    this.index$ = this.query.selectActiveId()
  }

  ngAfterViewChecked() {
    this.errors$.subscribe((errors) => {
      console.log('view check')
      let divToScrollTo: ElementRef = this.topDiv
      if (errors)
        if (errors.length)
          if (typeof this.errorDiv != 'undefined') divToScrollTo = this.errorDiv
      divToScrollTo.nativeElement.scrollIntoView()
    })
  }

  loadfile(step: Step) {
    this.service
    .displayFileInIDE(step)
    .then((_) => {
      this.toastr.clear()
      this.errorLoadingFile = false})
    .catch((_) => {
      this.errorLoadingFile = true
      this.spinner.hide()
      this.toastr.clear()
      this.toastr.error("File could not be loaded. Please try again.", `loading`, {
        timeOut: 0,
      })
    })
  }

  test(step: Step) {
    this.service.testStep(step)
  }

  answer(step: Step) {
    this.service.showAnswer(step)
  }

  previous() {
    this.store.update({ loading: true, success: false, error: null })
    const current = this.query.getActiveId()
    if (current !== 0) {
      this.service.loaded = false
      this.router.navigate(['..', current - 1], { relativeTo: this.route })
    }
  }

  isLast(id: ID) {
    return this.query.getCount() - 1 == id
  }

  getname(step: Step) {
    return step.name.replace(/_/g, ' ')
  }

  async next() {
    try {
      this.store.update({ loading: true, success: false, error: null })
      const current = this.query.getActiveId()
      const isLast = this.query.getCount() === current + 1
      const path = isLast ? ['../../view'] : ['..', current + 1]
      if (!this.query.getActive().test && !isLast) {
        this.service.next()
      }
      console.log('go to', path, this.query.getCount(), isLast, current)
      this.service.loaded = false
      await this.router.navigate(path, { relativeTo: this.route })
    } catch (err) {
      console.log('Cannot go next', err)
    }
  }

  ngOnDestroy() {
    this.store.update({ loading: true, success: false, error: null })
    this.toastr.clear()
  }
}
