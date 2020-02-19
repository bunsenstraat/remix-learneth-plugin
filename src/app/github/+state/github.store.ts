import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig, EntityUIStore } from '@datorama/akita';
import { github } from './github.model';


export interface GitHubState extends EntityState<github, string>, ActiveState<string> {}

const initialState: Partial<GitHubState> = {
    entities:{
        1:{
            id:"1",
            name:"bunsenstraat/remix-workshops",
            branch:"master",  
        },
        2:{
            id:"1",
            name:"ethereum/remix-workshops",
            branch:"master",  
        }

    },
    
  ids: [
    '1','2'
  ],
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'github' })
export class GitHubStore extends EntityStore<GitHubState> {
  
  constructor() {
    console.log(initialState);
    super(initialState);
  }

}