import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';

import { StepGuard } from './step.guard';

import { StepViewComponent } from './view/view.component';
import { StepListComponent } from './list/list.component';
import { BootstrapModule } from '../bootstrap.module';

@NgModule({
  declarations: [StepViewComponent, StepListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BootstrapModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: StepListComponent },
      {
        path: ':stepId',
        canActivate: [StepGuard],
        component: StepViewComponent
      },
    ])
  ]
})
export class StepModule { }
