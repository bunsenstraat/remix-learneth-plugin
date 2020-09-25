import { InjectionToken, Injectable } from '@angular/core'
import { connectIframe, PluginClient, listenOnThemeChanged } from '@remixproject/plugin'
import { EventManager } from '@angular/platform-browser';
import { ImportService } from './github/services/import.service'
import { github, scriptrunnerCommand } from './github/+state';
import { GithubModule } from './github/github.module';
import { inject } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemixClient extends PluginClient {
  private _loadRepoAction = new BehaviorSubject<scriptrunnerCommand>({name:"", branch:"",id:""});
  private _startTutorialAction = new BehaviorSubject<scriptrunnerCommand>({name:"", branch:"",id:""});

  loadRepoObservable = this._loadRepoAction.asObservable();
  startTutorialObservable = this._startTutorialAction.asObservable();

  constructor() {
   
    super();
    console.log("remix client created");
    this.methods = ["startTutorial","addRepository"];
    connectIframe(this);
    listenOnThemeChanged(this);
    this.onload().then(()=>{console.log("client loaded")})  
    }
    startTutorial(repoName,branch,id):void{
       console.log("start tutorial", repoName, branch, id)
       this._startTutorialAction.next({name:repoName,branch:branch,id:id})    
   } 
   addRepository(repoName, branch){
    console.log("add repo", repoName, branch);
    this._loadRepoAction.next({name:repoName,branch:branch,id:""})
   }




}

export const REMIX = new InjectionToken<RemixClient>('Remix client', {
  providedIn: 'root',
  factory: () => {
    return new RemixClient()
  }
})
