const WebSocket = require('ws')

class PubSubApp {
  use (middleware) {
    // TODO: implement
  }

  listen (port) {
    // TODO: create http server to use it for HTTPS
    this._wss = new WSServer({ port })
  }
}

class WSServer {
  constructor ({ port }) {
    this.onOpenConnection = this.onOpenConnection.bind(this)
    this.onCloseConnection = this.onCloseConnection.bind(this)

    this._wss = new WebSocket.Server({ port })
    this._wss.on('connection', this.onOpenConnection)
    this._connections = []
  }

  onOpenConnection (ws) {
    this.addConnection(new WSConnection(ws))
  }

  onCloseConnection (c) {
    this.removeConnection(c)
  }

  addConnection (c) {
    // TODO: subscribe on connection close
    // c.onCloseConnection = this.onCloseConnection
    this._connections.push(c)
  }

  removeConnection (c) {
    const idx = this._connections.indexOf(c)
    this._connections.splice(idx, 1)
  }
}

class WSConnection {
  constructor (ws) {
    this._ws = ws

    this.onClose = this.onClose.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.onPong = this.onPong.bind(this)

    this.subscribe()
  }

  onMessage (msg) {
    console.log('onMessage', msg)
    this._ws.send('I have got it!')
    try {
      msg = JSON.parse(msg)
    } catch (err) {
      console.log('it is not object', msg)
      return
    }

    const meta = { ...msg.meta, receivedAt: Date.now() }

    console.log('type:', msg.type)
    console.log('payload:', msg.payload)
    console.log('meta:', meta)
    console.log('delta (msec)', meta.receivedAt - meta.sentAt)
  }

  onPong (...args) {
    console.log('onPong', args)
  }

  onClose (...args) {
    console.log('onClose', args)
    this.unsubscribe()
    // TODO: trigger onCloseConnection handlers
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

module.exports = PubSubApp
