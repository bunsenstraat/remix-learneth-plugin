import { Inject, Injectable } from '@angular/core'
import { PluginClient } from '@remixproject/plugin'
import { REMIX, RemixClient } from 'src/app/remix-client'
import { createClient } from '@remixproject/plugin-iframe'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(@Inject(REMIX) private remix: RemixClient) {}
  async loadClient() {
    console.log(this.remix)
  //  await this.remix.onload()
  }
}
