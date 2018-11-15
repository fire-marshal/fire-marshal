import WSConnection from './ws-connection'

import Queue from './queue'

/**
 *
 * TODO: create web socket manager which:
 * - handles connections (reconnect)
 * - queues messages
 * - emit actions with socket connection state
 * - auth
 */
export default class ConnectionManager {
  constructor (store, options) {
    this._connection = new WSConnection(options)
    this._queue = new Queue()
  }

  send ({ type, payload, meta }) {
    // TODO:
    // add extra information about user
    // add to the queue of messages
    // - do we need to store/send all queue in case of bad connection?
    // - some messages could be not so important
    // - another could be overwrite by upcoming
    // (for example when user has already moved from some particular page)
    // (maybe we should add nesting of such messages?
    // So when user open a page we open nested group
    // but when she goes away we would close it, without sending any data)
    // - user consistently update her status (for example location)
    // (and we need only the last actual location and doesn't care about all history)

    this._queue.add(JSON.stringify({
      type,
      payload,
      meta: { ...meta, sentAt: Date.now() }
    }))

    // setTimeout(() => {
    //   // just temporal solution - freeze on 5 seconds before send message
    //   this._connection.send(JSON.stringify({
    //     type,
    //     payload,
    //     meta: { ...meta, sentAt: Date.now() }
    //   }))
    // }, 5 * 1000)
  }

  /**
   * Until we have connection and data in queue
   * we send data through web socket connection
   *
   * @private
   */
  _sendMessages () {
    while (!this._queue.isEmpty() && this._connection.isConnected()) {
      this._connection.send(this._queue.pop())
    }
  }
}
