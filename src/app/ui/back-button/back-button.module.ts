import { NgModule } from '@angular/core'
import { BackButtonComponent, NgbdModalConfirm } from './back-button.component'
import { CommonModule } from '@angular/common'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule, NgbModule],
  declarations: [BackButtonComponent, NgbdModalConfirm],
  exports: [BackButtonComponent],
  entryComponents: [NgbdModalConfirm]
})
export class BackButtonModule {}
