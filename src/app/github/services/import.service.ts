import { HttpClient } from '@angular/common/http'
import { Injectable, Inject } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment'
import { v4 as uuid } from 'uuid'
import { github } from '../+state'
import { GitHubQuery } from '../+state/github.query'
import { GitHubStore } from '../+state/github.store'
import { WorkshopState, WorkshopStore } from '../../workshop/+state'
import { PluginClient } from '@remixproject/plugin'
import { REMIX } from 'src/app/remix-client'

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
    private spinner: NgxSpinnerService,
    @Inject(REMIX) private remix: PluginClient
  ) {}

  async loadcontent(github: github) {
    const message = `${github.name}/${github.branch}`
    const githubname = encodeURIComponent(github.name)
    const url =
      `${environment.apiUrl}clone/${githubname}/${github.branch}?` +
      Math.random()
    this.spinner.show()
    const tid = this.toastr.info(`loading ${message}`, `loading`, {
      timeOut: 0
    }).toastId

    let error: string
    try {
      await this.remix
        .call('contentImport', 'resolve', url)
        .then(content => {
          console.log(content.content)
          error = content.content
          const initialState: Partial<WorkshopState> = JSON.parse(
            content.content
          )

          github = {
            ...github,
            datemodified: initialState.datemodified,
            data: initialState
          }
          console.log(initialState)
          this.workshopstore.set(initialState)
          this.toastr.remove(tid)
          this.spinner.hide()
          this.addGitHubToStore(github)
        })
        .catch(Error => {
          this.spinner.hide()
          this.toastr.remove(tid)
          this.toastr.error(`loading failed: ${error}`, `error loading`, {
            timeOut: 0
          })
        })
    } catch (err) {
      this.spinner.hide()
      this.toastr.remove(tid)
      this.toastr.error(`loading failed`, `error loading`, {
        timeOut: 0
      })
    }
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
