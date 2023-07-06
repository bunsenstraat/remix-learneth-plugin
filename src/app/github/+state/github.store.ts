import { Injectable } from '@angular/core'
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
  EntityUIStore
} from '@datorama/akita'
import { github } from './github.model'
import { environment } from 'src/environments/environment'

export interface GitHubState
  extends EntityState<github, string>,
    ActiveState<string> {}

const initialState: Partial<GitHubState> = {
  entities: {},
  ids: []
}

export interface GithubUI {
  isOpen: boolean
}

export interface GithubUIState extends EntityState<GithubUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'github' })
export class GitHubStore extends EntityStore<GitHubState> {
  ui: EntityUIStore<GithubUIState, GithubUI>
  constructor() {
    console.log(initialState)
    super(initialState)
    this.createUIStore(entity => ({ isOpen: true }))
    this.upsert(environment.github[0].id, { ...environment.github[0] })
  }
}
