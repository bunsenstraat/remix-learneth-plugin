import { Inject, Injectable } from '@angular/core'
import { PluginClient } from '@remixproject/plugin'
import { REMIX } from 'src/app/remix-client'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(@Inject(REMIX) private remix: PluginClient) {}
  async loadClient() {
    await this.remix.onload()
  }
}
