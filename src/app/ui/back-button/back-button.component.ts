import { Component, Input, OnInit } from '@angular/core'
import { faArrowLeft, faHome, faBars, faAngleLeft, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { StepQuery, Step } from 'src/app/step/+state';
import { WorkshopQuery, Workshop } from 'src/app/workshop/+state';
import { Observable } from 'rxjs';

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
  @Input() showStep:boolean

  constructor(
    private stepQuery: StepQuery,
    private workshopQuery: WorkshopQuery,

  ) {}
  ngOnInit(): void {
    this.stepQuery.selectActive().subscribe((step) => {
    //  console.log('menu step', step)
    })
    this.step$ = this.stepQuery.selectActive()
    this.workshop$ = this.workshopQuery.selectActive()
    this.workshopQuery.selectActive().subscribe((workshop) => {
    //  console.log('workshop ', workshop)
    })
  }

}
