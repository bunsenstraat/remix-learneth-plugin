import { Injectable, Inject } from '@angular/core';
import { ID } from '@datorama/akita';
import { StepStore } from './step.store';
import { Step } from './step.model';
import { REMIX } from 'src/app/remix-client';
import { PluginClient } from '@remixproject/plugin';

import { WorkshopQuery } from 'src/app/workshop/+state';
//import { NotificationStore } from 'src/app/notification/+state';
import { showStars } from '../../ui/stars.mo';
import { StepQuery } from './step.query';

/** Create the path for the file manager based on a step */
function getFilePath(step: Step, type: 'test' | 'solidity'): string {
  let fileName = '';
  if (step.fileName) {
    fileName = step.fileName;
  } else {
    const lastSegment = step[type].split('/').pop();
    if (lastSegment.split('.').pop() === 'sol') {
      fileName = lastSegment;
    } else {
      fileName = step.name.split(' ').join('-').toLocaleLowerCase();
    }
  }
  const name = step.fileName.split('.')[0];
  return type === 'test' ? `browser/${name}_test.sol` : `browser/${name}.sol`;
}

@Injectable({ providedIn: 'root' })
export class StepService {

  constructor(
    @Inject(REMIX) private remix: PluginClient,
    private workshopQuery: WorkshopQuery,
    private store: StepStore,
    private query: StepQuery,
  //  private toaster: NotificationStore
  ) {}

  async get(index: number, step: Step) {
    const [markdown, solidity, test] = await Promise.all([
      this.remix.call('contentImport', 'resolve', step.markdown),
      this.remix.call('contentImport', 'resolve', step.solidity),
      this.remix.call('contentImport', 'resolve', step.test),
    ]);
    this.store.upsert(index, {
      ...step,
      markdown: markdown ? markdown.content : undefined,
      solidity: solidity ? solidity.content : undefined,
      test: test ? test.content : undefined
    });
    this.store.setLoading(false);
  }

  async displaySolidity(step: Step) {
    console.log("step ",step);
    const workshopId = this.workshopQuery.getActiveId();
    const stepIndex = this.store._value().active;
    // Get content from account or step
    if (step.solidity) {
      const content = step.solidity;
      const path = getFilePath(step, 'solidity');
      await this.remix.call('fileManager', 'setFile', path, content);
      await this.remix.call('fileManager', 'switchFile', path);
    } else {
      //this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
    }
  }

  async testStep(step: Step) {
    try {
      // Update store before running tests
      this.store.update({ loading: true, success: false });

      // Run tests
      const result = await this.remix.call('solidityUnitTesting', 'testFromSource', step.test);

      // Update the account with the latest version of the code
      const workshopId = this.workshopQuery.getActiveId();
      const stepIndex = this.store._value().active;
      const content = await this.remix.call('fileManager', 'getFile', getFilePath(step, 'solidity'));
      //this.accountService.updateWorkshop(workshopId, stepIndex, content);

      // Update store after tests have run
      const success = result.totalFailing === 0;

      // Update next step of the account if succeed
      if (success) {
        this.store.update({ success, errorCount: 0, loading: false });
        showStars({ x: document.body.clientWidth / 2, y: document.body.clientHeight / 2 });
        this.next();
        // this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
      } else {
        this.addError(result.errors);
      }
    } catch (err) {
      const error = [{ message: err }];
      this.addError(error);
    }
  }

  /** Update the store and display message to user */
  addError(error: { message: string }[]) {
    this.store.update(s => ({
      errorCount: s.errorCount + 1,
      error,
      loading: false
    }));
    //const { errorCount } = this.query.getValue();
   // const msg = `You lose ${errorCount} time ${Array(errorCount).fill('👻').join('')}`;
    //this.toaster.show({ content: msg, type: 'warning', delay: 5000 });
  }

  next() {
    const workshopId = this.workshopQuery.getActiveId();
    const stepIndex = this.store._value().active;
    //this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
  }

  add(step: Step) {
    this.store.add(step);
  }

  update(id: number, step: Partial<Step>) {
    this.store.update(id, step);
  }

  remove(id: ID) {
    this.store.remove(id);
  }
}
