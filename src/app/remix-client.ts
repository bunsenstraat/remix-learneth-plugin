import { InjectionToken } from '@angular/core'
import { PluginClient } from '@remixproject/plugin';
import { createClient } from '@remixproject/plugin-iframe';
import { EventManager } from '@angular/platform-browser';
export class RemixClient  {

}

export const REMIX = new InjectionToken<RemixClient>('Remix client', {
  providedIn: 'root',
  factory: () => {
    return new RemixClient()
  }
})
