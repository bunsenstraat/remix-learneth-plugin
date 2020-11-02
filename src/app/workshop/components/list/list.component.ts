import {
  query as queryChild,
  stagger,
  transition,
  trigger
} from '@angular/animations'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { Observable, Subscription } from 'rxjs'
import {
  LoadingStatus,
  Workshop,
  WorkshopQuery,
  WorkshopStore
} from '../../+state'
import { slideInY } from '../../../ui/animations'
import { WorkshopserviceService } from '../../services/workshop.service'
import { faAngleRight, faAngleDown, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { PlugintesterserviceService } from 'src/app/remixide/plugintesterservice.service'

const slideIn = trigger('slideIn', [
  transition(':enter', [
    queryChild('li', [stagger(30, slideInY)], { optional: true })
  ])
])

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [slideIn]
})
export class ListComponent implements OnInit {
  workshops$: Observable<Workshop[]>
  isVisible$:Observable<boolean>
  tempStore: string[] = []
  subscription: Subscription
  

  public sortDown = faAngleRight
  public sortUp = faAngleDown
  public playIcon = faPlayCircle
  public show:boolean = true
  
  constructor(
    private service: WorkshopserviceService,
    private query: WorkshopQuery,
    private store: WorkshopStore,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private plugintesterservice:PlugintesterserviceService
  ) {}

  ngOnInit() {
    this.toastr.clear() // clear all notifications

    this.workshops$ = this.query.selectAll()

    this.subscription = this.workshops$.subscribe(workshops => {
      console.log(workshops)
    })

    this.plugintesterservice.errors.subscribe((e)=>{
      this.show = ( e.length == 0 )
    })


  }



  getlevel(workshop: Workshop) {

    const workshoplevels = new Map<string, string>();

    workshoplevels.set("1", "Beginner"); 
    workshoplevels.set("2", "Intermediate");
    workshoplevels.set("3", "Advanced");
   // console.log("get level",workshop);
    return workshop.metadata
      ? workshop.metadata.data
        ? workshoplevels.get(workshop.metadata.data.level.toString())
        : false
      : false
  }
  gettags(workshop: Workshop) {
    return workshop.metadata
      ? workshop.metadata.data
        ? workshop.metadata.data.tags
        : false
      : false
  }

  getname(workshop: Workshop) {
    return workshop.name
  }

  getdescription(workshop: Workshop) {
    return workshop.description
      ? workshop.description.content
      : false
  }

  isOpen(workshop: Workshop) {
    let isOpen = false
    this.query
      .selectUIisOpenEntity(workshop.id)
      .subscribe(val => (isOpen = val || false))
    return isOpen
  }

  toggleDescriptionUI(workshop: Workshop) {
    this.query.setUIDescriptionIsOpen(workshop.id)
  }

  trackByFn(index: number, workshop: Workshop) {
    return workshop.id
  }
}
