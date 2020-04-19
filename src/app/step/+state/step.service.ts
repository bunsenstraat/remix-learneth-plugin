import { Inject, Injectable } from '@angular/core'
import { ID } from '@datorama/akita'
import { PluginClient } from '@remixproject/plugin'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { REMIX } from 'src/app/remix-client'
import { WorkshopQuery } from 'src/app/workshop/+state'
import { Step } from './step.model'
import { StepQuery } from './step.query'
import { StepStore } from './step.store'

/** Create the path for the file manager based on a step */
function getFilePath(file: string): string {
  const name = file.split('/')
  return name.length > 1 ? `${name[name.length - 1]}` : ''
}

@Injectable({ providedIn: 'root' })
export class StepService {

  public loaded:boolean=false

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
    this.store.upsert(index, { ...step, test: step.test ? step.test : {} })
    this.store.upsert(index, {
      ...step,
      answer: step.answer ? step.answer : {},
    })
    this.store.upsert(index, { ...step, vy: step.vy ? step.vy : {} })
    this.store.upsert(index, { ...step, js: step.js ? step.js : {} })
    step = this.query.getEntity(index)

    const [markdown, solidity, test, answer, js, vy] = await Promise.all([
      this.remix.call('contentImport', 'resolve', step.markdown.file),
      this.remix.call('contentImport', 'resolve', step.solidity.file),
      this.remix.call('contentImport', 'resolve', step.test.file),
      this.remix.call('contentImport', 'resolve', step.answer.file),
      this.remix.call('contentImport', 'resolve', step.js.file),
      this.remix.call('contentImport', 'resolve', step.vy.file),
    ])

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
    // Get content from account or step
    console.log('loading ', step)
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
      const tid = this.toastr.info(`loading ${path} into IDE`, `loading`, {
        timeOut: 0,
      }).toastId
      this.spinner.show()

      await this.remix.call('fileManager', 'setFile', path, content)
      await this.remix.call('fileManager', 'switchFile', `browser/${path}`)
      this.spinner.hide()
      this.toastr.remove(tid)
    } else {
      //this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
    }
  }

  async testStep(step: Step) {
    try {
      // Update store before running tests
      this.store.update({ loading: true, success: false, error: null })

      // Run tests
      this.spinner.show()

      let path: string
      if (step.solidity.file) {
        path = getFilePath(step.solidity.file)
        await this.remix.call('fileManager', 'switchFile', `browser/${path}`)
      }


      console.log('testing ', step.test.content)
      const result = await this.remix.call(
        'solidityUnitTesting',
        'testFromSource',
        step.test.content
      )
      console.log('result ', result)
      this.spinner.hide()

      // compiler returns null?
      if (!result) {
        this.addError([{ message: 'Compiler failed to test this file' }])
      } else {
        const success = result.totalFailing === 0

        // Update next step of the account if succeed
        if (success) {
          this.store.update({ success: true, errorCount: 0, loading: false })
          this.next()
        } else {
          this.addError(result.errors)
        }
      }
      // Update store after tests have run
    } catch (err) {
      const error = [{ message: String(err) }]
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
  
        await this.remix.call('fileManager', 'setFile', path, content)
        await this.remix.call('fileManager', 'switchFile', `browser/${path}`)
        this.spinner.hide()
        this.toastr.remove(tid)
      } else {
        //this.accountService.updateWorkshop(workshopId, stepIndex + 1, '');
      }
    } catch (err) {
      const error = [{ message: String(err) }]
      this.addError(error)
    }
  }

  /** Update the store and display message to user */
  addError(error: { message: any }[]) {
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

  update(id: number, step: Partial<Step>) {
    this.store.update(id, step)
  }

  remove(id: ID) {
    this.store.remove(id)
  }
}
