import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig, EntityUIStore } from '@datorama/akita';
import { Workshop } from './workshop.model';

export interface WorkshopState extends EntityState<Workshop, string>, ActiveState<string> {
  datemodified:string;
}

const initialState: Partial<WorkshopState> = {
  entities: {
    6204164591: {
      name: 'Discover Solidity',
      description: {
        "file": "https://raw.githubusercontent.com/GrandSchtroumpf/solidity-school/master/README.md",
        "content":"test"
      },
      metadata: {
        "file": "https://raw.githubusercontent.com/bunsenstraat/remix-workshops/master/Basics/config.yml"
      },
      steps: [
        {
          name: 'Hello World',
          fileName: 'HelloWorld',
          markdown: {
            file: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/README.md'
          },
          solidity: {
            file: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld.sol'
          },
          test: {
            file: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld_test.sol'
          }
        },
        {
          name: 'Hello World 2',
          fileName: 'HelloWorld',
          markdown: {
            file: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/README.md'
          },
          solidity: {
            file: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld.sol'
          },
          test: {
            file: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld_test.sol'
          }
        },
      ],
      author: '969d3e43b4',
      id: '6204164591'
    }


  },
  ids: [
    '6204164591',
  ],
};


export interface WorkshopUI {
  isOpen: boolean;
  isLoading: boolean;
}

export interface WorkshopUIState extends EntityState<WorkshopUI> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workshop' })
export class WorkshopStore extends EntityStore<WorkshopState> {
  
  ui: EntityUIStore<WorkshopUIState,WorkshopUI>

  constructor() {
    console.log(initialState);
    super(initialState);
    this.createUIStore(entity => ({ isLoading: false, isOpen: true }));
  }

}

