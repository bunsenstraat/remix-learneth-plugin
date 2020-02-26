import { Injectable, Inject } from '@angular/core';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { PluginClient } from '@remixproject/plugin';



@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(@Inject(REMIX) private remix: PluginClient) { }

  async loadClient(){
    console.log("loading");
    await this.remix.onload();
    console.log("loaded");
  }


}
