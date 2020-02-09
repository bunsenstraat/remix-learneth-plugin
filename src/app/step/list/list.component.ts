import { Component, Input, Inject } from '@angular/core';
import { Step } from 'src/app/step/+state';
import { REMIX } from 'src/app/remix-client';
import { PluginClient } from '@remixproject/plugin';

@Component({
  selector: 'step-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StepListComponent {

  stepIndex = 0;
  started = false;  // Create a state

  @Input() steps: Step[];

  constructor(@Inject(REMIX) private remix: PluginClient) { }


  next(max: number) {
    if (this.stepIndex === max - 1) {
      return;
    }
    this.stepIndex++;
    this.started = false;
  }
}
