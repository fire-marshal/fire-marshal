class QueueItem {
  constructor (data) {
    this.data = data
    this.next = null
  }
}

export default class Queue {
  first = null

  add (data) {
    const item = new QueueItem(data)
    if (!this.first) {
      this.first = item
    } else {
      this.first.next = item
    }
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
    return first.data
  }
}
