import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIStore, EntityUIQuery, ID } from '@datorama/akita';
import { GitHubState, GitHubStore } from './github.store';

@Injectable({ providedIn: 'root' })
export class GitHubQuery extends QueryEntity<GitHubState> {


  constructor(protected store: GitHubStore) {
    super(store);
  }


}