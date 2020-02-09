import { NgModule } from '@angular/core';
import {
  NgbButtonsModule,
  NgbAlertModule,
  NgbAccordionModule,
  NgbPopoverModule,
  NgbToastModule
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  exports: [
    NgbButtonsModule,
    NgbAlertModule,
    NgbAccordionModule,
    NgbPopoverModule,
    NgbToastModule
  ]
})
export class BootstrapModule {}
