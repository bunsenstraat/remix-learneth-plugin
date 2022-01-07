import {
  Inject,
  Injectable
} from '@angular/core'
import {
  ID
} from '@datorama/akita'
import {
  PluginClient
} from '@remixproject/plugin'
import {
  NgxSpinnerService
} from 'ngx-spinner'
import {
  ToastrService
} from 'ngx-toastr'
import {
  BehaviorSubject,
  Observable
} from 'rxjs'
import {
  REMIX
} from 'src/app/remix-client'
import {
  WorkshopQuery
} from 'src/app/workshop/+state'
import {
  Step
} from './step.model'
import {
  StepQuery
} from './step.query'
import {
  StepStore
} from './step.store'

/** Create the path for the file manager based on a step */
function getFilePath(file: string): string {
  const name = file.split('/')
  return name.length > 1 ? `${name[name.length - 1]}` : ''
}

@Injectable({
  providedIn: 'root'
})
export class StepService {
  public loaded: boolean = false
  public status: BehaviorSubject < string > = new BehaviorSubject('loading');

  constructor(
    @Inject(REMIX) private remix: PluginClient,
    private workshopQuery: WorkshopQuery,
    private store: StepStore,
    private query: StepQuery,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService //  private toaster: NotificationStore
  ) {}

  async get(index: number, step: Step) {

    this.store.setLoading(true)
    this.store.upsert(index, {
      ...step,
      solidity: step.solidity ? step.solidity : {},
    })
    this.store.upsert(index, {
      ...step,
      test: step.test ? step.test : {}
    })
    this.store.upsert(index, {
      ...step,
      answer: step.answer ? step.answer : {},
    })
    this.store.upsert(index, {
      ...step,
      vy: step.vy ? step.vy : {}
    })
    this.store.upsert(index, {
      ...step,
      js: step.js ? step.js : {}
    })
    step = this.query.getEntity(index)

    let markdown, solidity, test, answer, js, vy

    if (step.markdown.file)
      markdown = await this.remix.call('contentImport', 'resolve', step.markdown.file).catch(error => {
        console.error(error.message)
      })
    if (step.solidity.file)
      solidity = await this.remix.call('contentImport', 'resolve', step.solidity.file).catch(error => {
        console.error(error.message)
      })
    if (step.test.file)
      test = await this.remix.call('contentImport', 'resolve', step.test.file).catch(error => {
        console.error(error.message)
      })
    if (step.answer.file)
      answer = await this.remix.call('contentImport', 'resolve', step.answer.file).catch(error => {
        console.error(error.message)
      })
    if (step.js.file)
      js = await this.remix.call('contentImport', 'resolve', step.js.file).catch(error => {
        console.error(error.message)
      })
    if (step.vy.file)
      vy = await this.remix.call('contentImport', 'resolve', step.vy.file).catch(error => {
        console.error(error.message)
      })


    this.store.upsert(index, {
      ...step,
      markdown: {
        ...step.markdown,
        content: markdown ? markdown.content : null,
      },
      solidity: {
        ...step.solidity,
        content: solidity ? solidity.content : null,
      },
      test: {
        ...step.test,
        content: test ? test.content : null,
      },
      answer: {
        ...step.answer,
        content: answer ? answer.content : null,
      },
      vy: {
        ...step.vy,
        content: vy ? vy.content : null,
      },
      js: {
        ...step.js,
        content: js ? js.content : null,
      },
    })

    this.store.setLoading(false)
  }

  async displayFileInIDE(step: Step) {
    let tid

    // Get content from account or step
    const workshop = this.workshopQuery.getActive()
    console.log('loading ', step, workshop)
    let content: string
    let path: string
    if (step.solidity.file) {
      content = step.solidity.content
      path = getFilePath(step.solidity.file)
    }
    if (step.js.file) {
      content = step.js.content
      path = getFilePath(step.js.file)
    }
    if (step.vy.file) {
      content = step.vy.content
      path = getFilePath(step.vy.file)
    }

    if (content) {
      tid = this.toastr.info(`loading ${path} into IDE`, `loading`, {
        timeOut: 0,
      }).toastId
      this.spinner.show()
      path = `.learneth/${workshop.name}/${step.name}/${path}`
      await this.remix.call('fileManager', 'setFile', path, content)
      await this.remix.call('fileManager', 'switchFile', `browser/${path}`)
      this.spinner.hide()
      this.toastr.remove(tid)
    } else {
      //this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
    }

  }

  async canTest(){
    try{
      // await this.remix.call("solidityUnitTesting","testFromSource","")
      return true
    }catch(e){
      return false
    }

  }

  async testStep(step: Step) {
    try {
      // Update store before running tests
      this.store.update({
        loading: true,
        success: false,
        error: null
      })

      // Run tests
      this.spinner.show()
      const workshop = this.workshopQuery.getActive()

      let path: string
      if (step.solidity.file) {
        path = getFilePath(step.solidity.file)
        path = `.learneth/${workshop.name}/${step.name}/${path}`
        await this.remix.call('fileManager', 'switchFile', `browser/${path}`)
      }

      console.log('testing ', step.test.content)

      path = getFilePath(step.test.file)
      path = `.learneth/${workshop.name}/${step.name}/${path}`
      await this.remix.call('fileManager', 'setFile', path, step.test.content)
      let result: any


      result = await this.remix.call(
        'solidityUnitTesting',
        'testFromPath',
        path
      )
      console.log('result ', result)
      this.spinner.hide()




      // compiler returns null?
      if (!result) {
        this.addError([{
          message: 'Compiler failed to test this file'
        }])
      } else {
        const success = result.totalFailing === 0

        // Update next step of the account if succeed
        if (success) {
          this.store.update({
            success: true,
            errorCount: 0,
            loading: false
          })
          this.next()
        } else {
          this.addError(result.errors)
        }
      }
      // Update store after tests have run
    } catch (err) {
      console.log("TESTING ERROR", err)
      const error = [{
        message: String(err)
      }]
      this.addError(error)
    }
  }

  async showAnswer(step: Step) {
    try {
      console.log('loading ', step)
      let content: string
      let path: string
      if (step.answer.file) {
        content = step.answer.content
        path = getFilePath(step.answer.file)
      }
      if (content) {
        const tid = this.toastr.info(`loading answer into IDE`, `loading`, {
          timeOut: 0,
        }).toastId
        this.spinner.show()
        const workshop = this.workshopQuery.getActive()
        path = `.learneth/${workshop.name}/${step.name}/${path}`
        await this.remix.call('fileManager', 'setFile', path, content)
        await this.remix.call('fileManager', 'switchFile', `browser/${path}`)
        this.spinner.hide()
        this.toastr.remove(tid)
      } else {
        //this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
      }
    } catch (err) {
      const error = [{
        message: String(err)
      }]
      this.addError(error)
    }
  }

  /** Update the store and display message to user */
  addError(error: {
    message: any
  } []) {
    this.store.update((s) => ({
      errorCount: s.errorCount + 1,
      error: error,
      loading: false,
      success: false,
    }))
    this.spinner.hide()
  }

  next() {
    const workshopId = this.workshopQuery.getActiveId()
    const stepIndex = this.store._value().active
  }

  add(step: Step) {
    this.store.add(step)
  }

  update(id: number, step: Partial < Step > ) {
    this.store.update(id, step)
  }

  remove(id: ID) {
    this.store.remove(id)
  }

  public getStatus(): Observable < string > {
    return this.status.asObservable();
  }

  public setStatus(n: string) {
    this.status.next(n)
  }
}
