const WebSocket = require('ws')
const EventEmitter = require('events')

const { connectionEvents, WSConnection } = require('./connection')

const serverEvents = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message'
}

/**
 * Get IP of client
 *
 * @param req
 * @returns {*}
 * @private
 */
function _getIP (req) {
  const forwaredFor = req.headers['x-forwarded-for']
  if (forwaredFor) {
    return forwaredFor.split(/\s*,\s*/)[0]
  } else {
    return req.connection.remoteAddress
  }
}

/**
 * we use callbacks instead of EventEmitter here
 * because we need to create context for connection (onConnect)
 * but handler of event can't return new ctx object.
 * Because we can have multiple handlers and there could be collision
 */
class WSServer extends EventEmitter {
  /**
   *
   * @param port
   * @param onConnect should be generator,
   * and return context on 1st iteration,
   * on 2nd iteration it could process other
   * @param onDisconnect
   * @param onMessage
   */
  constructor ({ port, context, onConnect, onDisconnect, onMessage }) {
    super()
    this.onOpenConnection = this.onOpenConnection.bind(this)
    this.onCloseConnection = this.onCloseConnection.bind(this)
    this.onMessage = this.onMessage.bind(this)

    this._context = context

    this._wss = new WebSocket.Server({ port })
    this._wss.on('connection', this.onOpenConnection)
    this._connections = []
  }

  onOpenConnection (ws, req) {
    console.log('onOpenConnection')
    const ip = _getIP(req)
    console.log('ip:', ip)

    const c = new WSConnection(ws)
    c.on(connectionEvents.MESSAGE, this.onMessage)
    this.addConnection(c)

    c.ctx = this._context(ws)
    this.emit(serverEvents.CONNECT, c.ctx)
  }

  onCloseConnection (c) {
    console.log('onCloseConnection')

    c.off(connectionEvents.MESSAGE, this.onMessage)
    this.removeConnection(c)

    this.emit(serverEvents.DISCONNECT, c.ctx)
  }

  onMessage ({ connection, message }) {
    // redispatch message event
    this.emit(serverEvents.MESSAGE, { context: connection.ctx, message })
  }

  addConnection (c) {
    this._connections.push(c)
    console.log('num of connections', this._connections.length)
  }

  removeConnection (c) {
    const idx = this._connections.indexOf(c)
    this._connections.splice(idx, 1)
  }
}

module.exports = {
  serverEvents,
  WSServer
}
