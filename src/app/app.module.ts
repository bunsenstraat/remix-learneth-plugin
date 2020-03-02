import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxSpinnerModule } from 'ngx-spinner'
import { ToastrModule } from 'ngx-toastr'
import { environment } from 'src/environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoadingscreenComponent } from './loadingscreen/loadingscreen.component'

@NgModule({
  declarations: [AppComponent, LoadingscreenComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-bottom-right',
      timeOut: 1500
    }),
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
