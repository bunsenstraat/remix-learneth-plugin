import { Component, OnInit } from '@angular/core';
import { PlugintesterserviceService } from '../plugintesterservice.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plugin-tester',
  templateUrl: './plugin-tester.component.html',
  styleUrls: ['./plugin-tester.component.css']
})
export class PluginTesterComponent implements OnInit {

  errors$: Observable < String[] >
  hasError:boolean = false

  constructor(
    private plugintestservice:PlugintesterserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    
    this.errors$ = this.plugintestservice.errors.asObservable()
    this.errors$.subscribe((e)=>{
      this.hasError = !( e.length == 0 )
      console.log(this.hasError," plugin errors")
    })
    this.test()

  }

  test(){
    this.plugintestservice.testSolidityCompiler()
  }

}
