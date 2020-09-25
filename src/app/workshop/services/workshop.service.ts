import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ID } from '@datorama/akita'
import { PluginClient } from '@remixproject/plugin'
import { ToastrService } from 'ngx-toastr'
import { REMIX } from 'src/app/remix-client'
import * as YAML from 'yaml'
import { LoadingStatus, Workshop, WorkshopQuery, WorkshopStore } from '../+state'
import { Observable, of, BehaviorSubject } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class WorkshopserviceService {
  private workshopsloaded = []
  private workshopsloading = []
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




  
}
