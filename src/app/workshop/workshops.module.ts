import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './workshops.component';
import { ListComponent } from './components/list/list.component';
import { WorkshopViewComponent } from './components/view/view.component'
import { BackButtonModule } from '../ui/back-button/back-button.module';

@NgModule({
  declarations: [WorkshopsComponent, ListComponent,WorkshopViewComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule,
    NgbModule,
    BackButtonModule
  ]
})
export class WorkshopsModule { }
