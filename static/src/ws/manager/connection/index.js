import * as actions from './actions'


export const connectionActions = actions

export class WSConnection {
  constructor (store, { url, retry = true, retryTimeout = 5 * 1000 }) {
    console.log('bootstrapWS')

    this._store = store

    this._url = url
    this._retry = retry
    this._retryTimeout = retryTimeout

    // bind all methods, so we could use them as callbacks
    this.reconnect = this.reconnect.bind(this)
    this.onError = this.onError.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onMessage = this.onMessage.bind(this)

    this.reconnect()
  }

  reconnect () {
    this._ws = new WebSocket(this._url)
    this._ws.onerror = this.onError
    this._ws.onopen = this.onOpen
    this._ws.onclose = this.onClose
    this._ws.onmessage = this.onMessage
  }

  onClose (...args) {
    console.warn(args)
    this._store.dispatch(actions.disconnect(args))
    if (this._retry) {
      setTimeout(this.reconnect, this._retryTimeout)
    }
  }

  onError (...args) {
    console.warn(args)
    this._store.dispatch(actions.error(args))
  }

  onMessage (evt) {
    this._store.dispatch(actions.message({
      data: evt.data,
      origin: evt.origin,
      source: evt.source,
      ports: evt.ports,
      lastEventId: evt.lastEventId,
    }))
  }

  onOpen () {
    this._store.dispatch(actions.connect())
  }

  isConnected () {
    return this._ws.readyState === this._ws.OPEN
  }

  send (data) {
    this._ws.send(data)
  }
}
