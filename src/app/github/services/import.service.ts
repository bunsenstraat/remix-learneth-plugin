import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment'
import { v4 as uuid } from 'uuid'
import { github } from '../+state'
import { GitHubQuery } from '../+state/github.query'
import { GitHubStore } from '../+state/github.store'
import { WorkshopState, WorkshopStore } from '../../workshop/+state'

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  constructor(
    private githubquery: GitHubQuery,
    private githubstore: GitHubStore,
    private http: HttpClient,
    private workshopstore: WorkshopStore,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  import(github: github) {
    const message = `${github.name}/${github.branch}`
    const githubname = encodeURIComponent(github.name)
    const url = `${environment.apiUrl}clone/${githubname}/${github.branch}`

    this.spinner.show()
    const tid = this.toastr.info(`loading ${message}`, `loading`, {
      timeOut: 0
    }).toastId
    this.http.get(url).subscribe(
      content => {
        const initialState: Partial<WorkshopState> = content
        github = {
          ...github,
          datemodified: initialState.datemodified,
          data: initialState
        }
        this.workshopstore.set(initialState)
        this.toastr.remove(tid)
        this.spinner.hide()
        this.addGitHubToStore(github)
      },
      error => {
        this.spinner.hide()
        this.toastr.remove(tid)
        const err = JSON.stringify(error.message)
        this.toastr.error(`loading ${message} : ${err}`, `error loading`, {
          timeOut: 0
        })
      }
    )
  }

  addGitHubToStore(github: github) {
    let searchitem: Array<github>

    this.githubquery.selectAll().subscribe(githubs => {
      searchitem = githubs.filter(
        item => item.name == github.name && item.branch == github.branch
      )
    })

    if (searchitem.length == 0) {
      github = { ...github, id: uuid() }
    }
    this.githubstore.upsert(github.id, { ...github })
    this.githubstore.setActive(github.id)
  }
}
