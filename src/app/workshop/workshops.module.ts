import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './workshops.component';
import { ListComponent } from './components/list/list.component';
import { WorkshopViewComponent } from './components/view/view.component'
import { BackButtonModule } from '../ui/back-button/back-button.module';
import { HttpClientModule } from '@angular/common/http'; 
import { MarkdownModule } from 'ngx-markdown';
import { ImporterComponent } from '../github/components/importer/importer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GithubModule } from '../github/github.module';
@NgModule({
  declarations: [WorkshopsComponent, ListComponent,WorkshopViewComponent, ImporterComponent],
  imports: [
    CommonModule,
    WorkshopsRoutingModule,
    NgbModule,
    GithubModule,
    FormsModule,
    ReactiveFormsModule,
    BackButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    MarkdownModule.forRoot(),
    NgxSpinnerModule
  ]
})
export class WorkshopsModule { }
