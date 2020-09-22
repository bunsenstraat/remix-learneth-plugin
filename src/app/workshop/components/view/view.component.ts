import {
  query as queryChild,
  stagger,
  transition,
  trigger,
} from '@angular/animations'
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { Step, StepStore } from 'src/app/step/+state'
import { Workshop, WorkshopQuery } from '../../+state'
import { slideInY } from '../../../ui/animations'

const slideIn = trigger('slideIn', [
  transition(':enter', [queryChild('a', [stagger(30, slideInY)])]),
])
@Component({
  selector: 'workshop-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn],
})
export class WorkshopViewComponent implements OnInit, AfterViewInit {
  @ViewChild('top') topDiv: ElementRef
  workshop$: Observable<Workshop>
  currentIndex$: Observable<number>

  constructor(
    private query: WorkshopQuery,
    private router: Router,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private stepstore: StepStore
  ) {}

  ngAfterViewInit() {
    this.topDiv.nativeElement.scrollIntoView()
  }

  ngOnInit() {
    this.toastr.clear() // clear all notifications
    this.workshop$ = this.query.selectActive()
    this.workshop$.subscribe((workshop) => {
      this.stepstore.remove()
      if (workshop) {
        workshop.steps.map((step, index) => {
          this.stepstore.upsert(index, step)
        })
      }
    })
  }

  getname(step: Step) {
    return step.name.replace(/_/g, ' ')
  }

  start() {
    const id = this.query.getActiveId()
    this.router.navigate(['../steps/0'], { relativeTo: this.routes })
  }
}
