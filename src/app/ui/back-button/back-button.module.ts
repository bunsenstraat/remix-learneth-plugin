import { NgModule } from '@angular/core';
import { BackButtonComponent } from './back-button.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  declarations: [BackButtonComponent],
  exports: [BackButtonComponent]
})
export class BackButtonModule {}
