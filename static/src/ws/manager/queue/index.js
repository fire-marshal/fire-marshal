// TODO: should add this package of ws middleware once I will move it to dedicated @@gaf/ws module
import EventEmitter from 'eventemitter3'

import * as actions from './actions'

export const queueActions = actions

class QueueItem {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

export class Queue extends EventEmitter {
  first = null

  constructor (store) {
    super()
    this._store = store
  }

  add (data) {
    const item = new QueueItem(data)
    if (!this.first) {
      this.first = item
    } else {
      this.first.next = item
    }
    this._store.dispatch(queueActions.add(data))
  }

  isEmpty () {
    return !this.first
  }

  pop () {
    if (!this.first) {
      return null
    }
    const first = this.first
    this.first = this.first.next
    this._store.dispatch(queueActions.remove(first.data))
    return first.data
  }
}
