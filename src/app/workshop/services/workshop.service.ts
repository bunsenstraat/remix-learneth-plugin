import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ID } from '@datorama/akita'
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment'
import YAML from 'yaml'
import {
  LoadingStatus,
  Workshop,
  WorkshopQuery,
  WorkshopStore
} from '../+state'

@Injectable({
  providedIn: 'root'
})
export class WorkshopserviceService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private workShopStore: WorkshopStore,
    private query: WorkshopQuery,
    private store: WorkshopStore
  ) {}

  toggleUIDescription(id: ID) {
    this.workShopStore.ui.upsert(id, entity => ({ isOpen: !entity.isOpen }))
  }

  getDescription(workshop: Workshop) {
    this.http
      .post(
        `${environment.apiUrl}getFile`,
        { file: workshop.description.file },
        { responseType: 'text' }
      )
      .subscribe(
        content => {
          const storedworkshop = this.query.getEntity(workshop.id) // get the entity out of the store because it might have changed
          this.store.upsert(storedworkshop.id, {
            ...storedworkshop,
            text: content,
            description: {
              ...storedworkshop.description,
              status: LoadingStatus.finished
            }
          })
        },
        response => {
          this.toastr.warning(workshop.description.file, 'File not Loaded')
        }
      )
  }

  getMetaData(workshop: Workshop) {
    const metadata = [workshop.metadata]
      .filter(meta => meta)
      .map(meta => {
        this.http
          .post(
            `${environment.apiUrl}getFile`,
            { file: meta.file },
            { responseType: 'text' }
          )
          .subscribe(
            content => {
              const storedworkshop = this.query.getEntity(workshop.id) // get the entity out of the store because it might have changed
              const newdata = {
                ...storedworkshop,
                metadata: {
                  ...storedworkshop.metadata,
                  data: YAML.parse(content)
                }
              }
              this.store.upsert(workshop.id, newdata)
            },
            response => {
              this.toastr.warning(workshop.description.file, 'File not Loaded')
            }
          )
      })
  }
}
