import { Inject, Injectable } from '@angular/core'
import { REMIX, RemixClient } from 'src/app/remix-client'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(@Inject(REMIX) private remix: RemixClient) {}
  async loadClient() {
    console.log(this.remix)
    await this.remix.onload()
  }
}
