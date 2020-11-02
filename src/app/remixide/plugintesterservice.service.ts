import { Injectable, Inject } from '@angular/core';
import { REMIX } from '../remix-client';
import { PluginClient } from '@remixproject/plugin'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlugintesterserviceService {

  public errors: BehaviorSubject<string[]> = new BehaviorSubject([])

  constructor(
    @Inject(REMIX) private remix: PluginClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService //  private toaster: NotificationStore
  ) { }

  testSolidityCompiler(){
    this.errors.next([])
    this.remix.call('solidity', 'getCompilationResult').then((r)=>console.log(r)).catch((e)=>{
      //solidity compiler test failed
      var m = "The `Solidity Compiler` is not yet activated.<br>Please activate it using the `SOLDITY` button in the `Featured Plugins` section of the homepage."
      m += "<img class='img-thumbnail mt-3' src='/assets/activatesolidity.png'>"
      this.errors.next([...this.errors.getValue(),m])
    }) 

  }
}
