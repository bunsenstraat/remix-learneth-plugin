import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkshopsComponent } from './workshops.component';
import { ListComponent } from './components/list/list.component';
import { WorkshopViewComponent } from './components/view/view.component';
import { StartedWorkshopGuard, ActiveWorkshopGuard } from './workshop.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  {
    path: ':workshopId',
    canActivate: [ActiveWorkshopGuard],
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'view', component: WorkshopViewComponent },
      {
        path: 'steps',
        //canActivate: [StartedWorkshopGuard],
        loadChildren: () => import('../step/step.module').then(m => m.StepModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopsRoutingModule { }
