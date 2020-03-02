import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { fadeInOnEnterAnimation, fadeOutUpOnLeaveAnimation } from 'angular-animations'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from './loader.service'
@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.css'],
  animations: [fadeOutUpOnLeaveAnimation(), fadeInOnEnterAnimation()]
})
export class LoadingscreenComponent implements OnInit {
  private loaded = false

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.spinner.show()
    this.toastr.info('connecting to the REMIX IDE', 'please wait', {
      timeOut: 0
    }).toastId
    this.loader.loadClient().then(() => {
      this.toastr.clear()
      this.spinner.hide()
      this.loaded = true
      this.router.navigate(['/workshops'])
    })
  }
}
