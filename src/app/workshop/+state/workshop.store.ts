import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';
import { Workshop } from './workshop.model';

export interface WorkshopState extends EntityState<Workshop, string>, ActiveState<string> {}

const initialState: Partial<WorkshopState> = {
  entities: {
    6204164591: {
      name: 'Discover Solidity',
      description: {
        "file": "https://raw.githubusercontent.com/GrandSchtroumpf/solidity-school/master/README.md",
        "content":"test"
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
    },
    234234234: {
      name: 'Discover Solidity2',
      description: {
        "file": "https://raw.githubusercontent.com/bunsenstraat/remix-workshops/master/DeployWithLibraries/3_metadata_JSON/contractSimpleLibrary.sol",
        "content":"test"
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
        }
      ],
      author: '969d3e43b4',
      id: '234234234'
    },


  },
  ids: [
    '6204164591',
    '234234234'
  ],
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'workshop' })
export class WorkshopStore extends EntityStore<WorkshopState> {

  constructor() {
    console.log(initialState);
    super(initialState);
  }

}

