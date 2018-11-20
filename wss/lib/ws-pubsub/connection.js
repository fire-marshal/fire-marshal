const EventEmitter = require('events')

const connectionEvents = {
  MESSAGE: 'message'
}

class WSConnection extends EventEmitter {
  constructor (ws) {
    super()
    this._ws = ws

    this.onClose = this.onClose.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.onPong = this.onPong.bind(this)

    this.subscribe()
  }

  onClose (...args) {
    console.log('onClose', args)
    this.unsubscribe()
    // TODO: trigger onCloseConnection handlers
  }

  onMessage (message) {
    console.log('onMessage', message)
    this.emit(connectionEvents.MESSAGE, { connection: this, message })
  }

  onPong (...args) {
    console.log('onPong', args)
  }

  subscribe (c) {
    this._ws.on('message', this.onMessage)
    this._ws.on('pong', this.onPong)
    this._ws.on('close', this.onClose)
  }

  unsubscribe (c) {
    this._ws.off('message', this.onMessage)
    this._ws.off('pong', this.onPong)
    this._ws.off('close', this.onClose)
  }
}

module.exports = {
  connectionEvents,
  WSConnection
}
