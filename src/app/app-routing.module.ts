import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  //{ path: '', redirectTo: 'workshops', pathMatch: 'full' },
  { path: 'workshops', loadChildren: () => import('./workshop/workshops.module').then(m => m.WorkshopsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
