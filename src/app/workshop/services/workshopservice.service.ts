import { Injectable, Inject } from '@angular/core';
import { REMIX, RemixClient } from 'src/app/remix-client';

@Injectable({
  providedIn: 'root'
})
export class WorkshopserviceService {

  constructor(
    @Inject(REMIX) private remix: RemixClient,
  ) { }

  async getAll() {
    await this.remix.onload(()=>{console.log('client loaded')});
  }

}
