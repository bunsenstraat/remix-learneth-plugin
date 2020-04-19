import { Component, OnInit } from '@angular/core'
import {
  faCaretDown,
  faCaretUp,
  faInfo,
  faQuestionCircle,
  faCloudDownloadAlt
} from '@fortawesome/free-solid-svg-icons'
import { ToastrService } from 'ngx-toastr'
import { Observable } from 'rxjs'
import { WorkshopQuery } from 'src/app/workshop/+state'
import { environment } from 'src/environments/environment'
import { github } from '../../+state'
import { GitHubQuery } from '../../+state/github.query'
import { GitHubStore } from '../../+state/github.store'
import { ImportService } from '../../services/import.service'
import { persistState, Store } from '@datorama/akita'

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.css']
})
export class ImporterComponent implements OnInit {
  infoIcon = faInfo
  model: github
  repos$: Observable<github[]>
  public sortDown = faCaretDown
  public sortUp = faCaretUp
  public importIcon = faCloudDownloadAlt
  questionIcon = faQuestionCircle

  constructor(
    private importservice: ImportService,
    private toastr: ToastrService,
    private githubstore: GitHubStore,
    private githubquery: GitHubQuery,
    private workshopquery: WorkshopQuery
  ) {}

  ngOnInit() {
    if (!this.githubstore._value().active || typeof this.githubstore._value().active=="undefined") this.selectfirst()

    //console.log(this.githubstore._value().active)
    
    this.githubquery
      .selectFirst()
      .subscribe(gh => (typeof gh == 'undefined' ? this.resetall() : false))

    this.githubquery.selectActive().subscribe(github => {
      this.model = { ...github }
    })
    this.repos$ = this.githubquery.selectAll()
  }
  sync() {
    console.log('submit')

    //this.importservice.import(this.model)
    this.importservice.loadcontent(this.model)
  }

  selectfirst() {
    console.log("select first")
    this.githubquery
      .selectFirst()
      .subscribe(gh => {
          this.githubstore.setActive(gh.id)
          this.selectrepo(gh)
      }
      ).unsubscribe()
  }

  resetall() {
    //console.log('reset')
    this.githubquery.reset()
    const storage = persistState()
    storage.clearStore()
    this.selectfirst()
  }

  loadedGithub() {
    let activeModel: github
    this.githubquery.selectActive().subscribe(github => {
      activeModel = { ...github }
    })
    return activeModel
  }

  repoLoaded() {
    return this.workshopquery.getCount() > 0
  }

  selectrepo(repo: github) {
    console.log('select repo')
    this.importservice.loadcontent(repo)
  }

  panelChange() {
    this.toggleUI()
  }

  isOpen() {
    if (!this.repoLoaded()) return true
    let isOpen = true
    if (typeof this.model != 'undefined')
      this.githubquery
        .selectUIisOpenEntity(this.model.id)
        .subscribe(val => (isOpen = val || false))
    return isOpen
  }

  toggleUI() {
    this.githubquery.setUIIsOpen(this.model.id)
  }

  gethelp() {
    return environment.help
  }

  onChangeName(newValue: string) {
    console.log(newValue)
    if (newValue.includes('https://')) {
      this.toastr.warning(
        'Github name should be username/reponame',
        'Bad github name'
      )
    }
  }
}
