import { Injectable } from '@angular/core';
import { QueryEntity, EntityUIStore, EntityUIQuery, ID } from '@datorama/akita';
import { GitHubState, GitHubStore } from './github.store';
import { github } from './github.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GitHubQuery extends QueryEntity<GitHubState> {


  constructor(protected store: GitHubStore) {
    super(store);
  }


}