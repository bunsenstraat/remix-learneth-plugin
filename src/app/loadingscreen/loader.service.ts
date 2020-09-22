import { Inject, Injectable } from '@angular/core'
import { PluginClient } from '@remixproject/plugin'
import { REMIX } from 'src/app/remix-client'
import { connectIframe } from '@remixproject/plugin'
import { createClient } from '@remixproject/plugin-iframe'

class CodeExecutor extends PluginClient {
  execute (script) {
    if (script) {
      try {
        (new Function(script))()
      } catch (e) {
        this.emit('error', {
          data: [e.message]
        })
      }
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(@Inject(REMIX) private remix: CodeExecutor) {}
  async loadClient() {
    console.log(this.remix)
    createClient(new CodeExecutor())
    await this.remix.onload()
  }
}
