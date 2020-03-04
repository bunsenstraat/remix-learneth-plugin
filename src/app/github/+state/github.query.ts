import { Injectable } from '@angular/core'
import { QueryEntity, EntityUIStore, EntityUIQuery, ID } from '@datorama/akita'
import { resetStores } from "@datorama/akita";
import {
  GitHubState,
  GitHubStore,
  GithubUIState,
  GithubUI
} from './github.store'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class GitHubQuery extends QueryEntity<GitHubState> {
  ui: EntityUIQuery<GithubUIState, GithubUI>
  constructor(protected store: GitHubStore) {
    super(store)
    this.createUIQuery()
  }

  selectUIisOpenEntity(id: ID): Observable<boolean> {
    return this.ui.selectEntity(id, 'isOpen')
  }

  reset(){
    resetStores()
  }

  setUIIsOpen(id: ID) {
    console.log('set open', id)
    this.store.ui.upsert(id, entity => ({ isOpen: !entity.isOpen }))
  }
}
