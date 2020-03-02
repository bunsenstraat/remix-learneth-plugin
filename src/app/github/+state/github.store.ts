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
  entities: environment.github
    .map(function(e, k) {
      return { id: k, name: e.name, branch: e.branch }
    })
    .reduce(function(map, obj) {
      map[obj.id] = obj
      return map
    }, {}),

  ids: environment.github.map(function(e, k) {
    return `${k}`
  })
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
  }
}
