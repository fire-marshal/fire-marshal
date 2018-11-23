import { connectionActions, WSConnection } from './connection'
import { queueActions, Queue } from './queue'

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
    this._connection = new WSConnection(store, options)
    this._queue = new Queue(store)
    this._store = store
  }

  // redux action handlers
  [connectionActions.actionTypes.CONNECT] = () => {
    this._sendMessages()
  }

  /**
   * dispatch incoming messages to the local redux event bus
   *
   * @param action
   */
  [connectionActions.actionTypes.MESSAGE] = (action) => {
    let data
    try {
      data = JSON.parse(action.payload.data)
    } catch (e) {
      console.log('we got message which we can not unpack')
      console.log(action)
      return
    }

    data = { ...data, meta: { ...data.meta, receivedAt: Date.now() } }
    this._store.dispatch(data)

    // TODO: could check performance for round trip packages
    // try {
    //   console.log('round trip time (ms)', Date.now() - data.payload.meta.createdAt)
    // } catch (e) {
    //
    // }
  }

  [queueActions.actionTypes.ADD] = () => {
    this._sendMessages()
  }

  handle (action) {
    const handler = this[action.type]
    if (!handler) {
      return
    }
    handler(action)
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

    const message = JSON.stringify({
      type,
      payload,
      meta: { ...meta, sentAt: Date.now() }
    })

    if (this._connection.isConnected()) {
      // don't use queue when we have connection
      this._connection.send(message)
    } else {
      this._queue.add(message)
    }
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
