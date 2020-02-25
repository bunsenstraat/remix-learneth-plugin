import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import {  fadeOutUpOnLeaveAnimation, fadeInOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-loadingscreen',
  templateUrl: './loadingscreen.component.html',
  styleUrls: ['./loadingscreen.component.css'],
  animations:[ fadeOutUpOnLeaveAnimation(), fadeInOnEnterAnimation() ]
})
export class LoadingscreenComponent implements OnInit {

  private loaded = false;
  
  constructor(private toastr:ToastrService, private spinner:NgxSpinnerService, private router:Router, private loader:LoaderService) { }

  ngOnInit() {
    this.spinner.show();
    const toastId = this.toastr.info("connecting to the REMIX IDE","please wait", {timeOut:0}).toastId;
    const load = this.loader.loadClient().then(()=>{
      this.toastr.clear();
      this.spinner.hide();
      this.loaded = true;
      this.router.navigate(['/workshops'])
    });

  }

}
