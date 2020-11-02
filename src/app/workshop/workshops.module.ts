import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MarkdownModule } from 'ngx-markdown'
import { NgxSpinnerModule } from 'ngx-spinner'
import { ImporterComponent } from '../github/components/importer/importer.component'
import { GithubModule } from '../github/github.module'
import { BackButtonModule } from '../ui/back-button/back-button.module'
import { ListComponent } from './components/list/list.component'
import { WorkshopViewComponent } from './components/view/view.component'
import { WorkshopsRoutingModule } from './workshops-routing.module'
import { WorkshopsComponent } from './workshops.component'
import { RemixideModule } from '../remixide/remixide.module'
import { PluginTesterComponent } from '../remixide/plugin-tester/plugin-tester.component'
@NgModule({
  declarations: [
    WorkshopsComponent,
    ListComponent,
    WorkshopViewComponent,
    ImporterComponent,
    PluginTesterComponent
  ],
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
    NgxSpinnerModule,
    RemixideModule
  ]
})
export class WorkshopsModule {}
