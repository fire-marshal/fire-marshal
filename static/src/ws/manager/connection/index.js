import * as actions from './actions'


export const connectionActions = actions

export class WSConnection {
  constructor (store, { url }) {
    console.log('bootstrapWS')

    this._store = store

    this._ws = new WebSocket(url)
    this._ws.onerror = this.onError.bind(this)
    this._ws.onopen = this.onOpen.bind(this)
    this._ws.onclose = this.onClose.bind(this)
    this._ws.onmessage = this.onMessage.bind(this)
  }

  onClose (...args) {
    this._store.dispatch(actions.disconnect(args))
  }

  onError (...args) {
    this._store.dispatch(actions.error(args))
  }

  onMessage (...args) {
    this._store.dispatch(actions.message(args))
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
