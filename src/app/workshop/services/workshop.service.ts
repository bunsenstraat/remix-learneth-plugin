import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ID } from '@datorama/akita'
import { PluginClient } from '@remixproject/plugin'
import { ToastrService } from 'ngx-toastr'
import { REMIX } from 'src/app/remix-client'
import YAML from 'yaml'
import { LoadingStatus, Workshop, WorkshopQuery, WorkshopStore } from '../+state'

@Injectable({
  providedIn: 'root'
})
export class WorkshopserviceService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private workShopStore: WorkshopStore,
    private query: WorkshopQuery,
    private store: WorkshopStore,
    @Inject(REMIX) private remix: PluginClient
  ) {}

  toggleUIDescription(id: ID) {
    this.workShopStore.ui.upsert(id, entity => ({ isOpen: !entity.isOpen }))
  }

  async getDescription(workshop: Workshop) {
    await this.remix
      .call(
        'contentImport',
        'resolve',
        workshop.description.file + `?` + Math.random()
      )
      .then(content => {
        const storedworkshop = this.query.getEntity(workshop.id) // get the entity out of the store because it might have changed
        this.store.upsert(storedworkshop.id, {
          ...storedworkshop,
          text: content.content,
          description: {
            ...storedworkshop.description,
            status: LoadingStatus.finished
          }
        })
      })
      .catch(Error => {
        this.toastr.warning(workshop.description.file, 'File not Loaded')
      })
  }

  getMetaData(workshop: Workshop) {
    const metadata = [workshop.metadata]
      .filter(meta => meta)
      .map(async meta => {
        await this.remix
          .call('contentImport', 'resolve', meta.file + `?` + Math.random())
          .then(content => {
            const storedworkshop = this.query.getEntity(workshop.id) // get the entity out of the store because it might have changed
            const newdata = {
              ...storedworkshop,
              metadata: {
                ...storedworkshop.metadata,
                data: YAML.parse(content.content)
              }
            }
            this.store.upsert(workshop.id, newdata)
          })
          .catch(Error => {
            this.toastr.warning(workshop.description.file, 'File not Loaded')
          })
      })
  }
}
