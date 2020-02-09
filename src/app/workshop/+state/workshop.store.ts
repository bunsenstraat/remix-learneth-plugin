import { Injectable } from '@angular/core';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';
import { Workshop } from './workshop.model';

export interface WorkshopState extends EntityState<Workshop, string>, ActiveState<string> {}

const initialState: Partial<WorkshopState> = {
  entities: {
    6204164591: {
      name: 'Discover Solidity',
      description: 'Beginner workshop to discover Solidity. You will learn how to create a method and change the state.',
      steps: [
        {
          name: 'Hello World',
          fileName: 'HelloWorld',
          markdown: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/README.md',
          solidity: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld.sol',
          test: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld_test.sol'
        },
        {
          name: 'Storage',
          fileName: 'Storage',
          markdown: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/2_Storage/README.md',
          solidity: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/2_Storage/Storage.sol',
          test: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/2_Storage/Storage_test.sol'
        },
        {
          name: 'Greeter',
          fileName: 'Greeter',
          markdown: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/3_Greeter/README.md',
          solidity: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/3_Greeter/Greeter.sol',
          test: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/3_Greeter/Greeter_test.sol'
        }
      ],
      author: '969d3e43b4',
      id: '6204164591'
    },

    1239898398: {
      name: 'Discover Solidity 2',
      description: 'Beginner workshop to discover Solidity. You will learn how to create a method and change the state.',
      steps: [
        {
          name: 'Hello World',
          fileName: 'HelloWorld',
          markdown: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/README.md',
          solidity: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld.sol',
          test: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/1_HelloWorld/HelloWorld_test.sol'
        },
        {
          name: 'Storage',
          fileName: 'Storage',
          markdown: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/2_Storage/README.md',
          solidity: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/2_Storage/Storage.sol',
          test: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/2_Storage/Storage_test.sol'
        },
        {
          name: 'Greeter',
          fileName: 'Greeter',
          markdown: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/3_Greeter/README.md',
          solidity: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/3_Greeter/Greeter.sol',
          test: 'https://github.com/GrandSchtroumpf/solidity-school/blob/master/std-0/3_Greeter/Greeter_test.sol'
        }
      ],
      author: '969d3e43b4',
      id: '6204164591'
    }

  },
  ids: [
    '6204164591',
    '1239898398'
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

