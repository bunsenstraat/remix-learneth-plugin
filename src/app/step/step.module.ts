import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MarkdownModule } from 'ngx-markdown'
import { NgxSpinnerModule } from 'ngx-spinner'
import { BootstrapModule } from '../bootstrap.module'
import { StepGuard } from './step.guard'
import { StepViewComponent } from './view/view.component'
import { BackButtonModule } from '../ui/back-button/back-button.module'



@NgModule({
  declarations: [StepViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackButtonModule,
    FontAwesomeModule,
    BootstrapModule,
    NgxSpinnerModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: ':stepId',
        canActivate: [StepGuard],
        component: StepViewComponent
      }
    ])
  ]
})
export class StepModule {}
