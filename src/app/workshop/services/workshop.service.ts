import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ID } from '@datorama/akita'
import { PluginClient } from '@remixproject/plugin'
import { ToastrService } from 'ngx-toastr'
import { REMIX } from 'src/app/remix-client'
import YAML from 'yaml'
import { LoadingStatus, Workshop, WorkshopQuery, WorkshopStore } from '../+state'
import { Observable, of, BehaviorSubject } from 'rxjs'
import { unwatchFile } from 'fs'

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

  async getDescription(workshop: Workshop) {
    try{
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
    }catch(err){
      //console.log(err)
    }
  }

  setworkshoploading(workshop:Workshop){
    this.workshopsloading.push(workshop.id)
  }

  getworkshopisloading(workshop:Workshop){
    return this.workshopsloading.indexOf(workshop.id)>-1
  }

  private _allitemsloaded = new BehaviorSubject<boolean>(false);
  allitemsloaded$ = this._allitemsloaded.asObservable();
  resetWorksShopsLoaded(){
    //console.log("reset workshop list");
    this.workshopsloaded = []
    this.workshopsloading = []
    this._allitemsloaded.next(this.workshopsloaded.length >= this.query.getCount())
  }

  addworkShopToLoaded(workshop: Workshop){
    this.workshopsloaded.push(workshop.id)
    this._allitemsloaded.next(this.workshopsloaded.length >= this.query.getCount())
    //console.log(this.workshopsloaded.length, this.query.getCount())
  }

  getMetaData(workshop: Workshop) {
    //console.log("get meta data",workshop);
    if (this.workshopsloaded.some(e => e === workshop.id)) return true;
    if(!workshop.metadata){
      console.log("no files to load");
      this.addworkShopToLoaded(workshop)
    }
    const metadata = [workshop.metadata]
      .filter(meta => meta)
      .map(async meta => {
        await this.remix
          .call('contentImport', 'resolve', meta.file + `?` + Math.random())
          .then(content => {
            //console.log(meta.file, content);
            const storedworkshop = this.query.getEntity(workshop.id) // get the entity out of the store because it might have changed
            let incomingdata = YAML.parse(content.content)
            let newname = workshop.name
            if(incomingdata.name && incomingdata.name!=""){
              newname=incomingdata.name
            }else{
              incomingdata.name = newname
            }
            const newdata = {
              ...storedworkshop,
              name: newname,
              metadata: {
                ...storedworkshop.metadata,
                data: incomingdata
              }
            }
            if(!newdata.metadata.data){newdata.metadata.data = {name:newdata.name}}
           // console.log("incoming metadata", newdata, workshop);
            this.store.upsert(workshop.id, newdata)
            this.addworkShopToLoaded(workshop)
          })
          .catch(Error => {
            const storedworkshop = this.query.getEntity(workshop.id) 
            const newdata = {
              ...storedworkshop,
              metadata: {
                ...storedworkshop.metadata
              }
            }
            if(!newdata.metadata.data){newdata.metadata.data = {name:newdata.name}}
            this.store.upsert(workshop.id, newdata)
            this.toastr.warning(workshop.description.file, 'File not Loaded')
            this.addworkShopToLoaded(workshop)
          })
      })
  }
}
