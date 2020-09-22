import { InjectionToken } from '@angular/core'
import { PluginClient } from '@remixproject/plugin';
import { createClient } from '@remixproject/plugin-iframe';
import { EventManager } from '@angular/platform-browser';
export class RemixClient extends PluginClient {
  constructor() {
    super();
    this.methods = ["sendAsync"];
    createClient(this);
    this.onload()
}
}

export const REMIX = new InjectionToken<RemixClient>('Remix client', {
  providedIn: 'root',
  factory: () => {
    return new RemixClient()
  }
})
