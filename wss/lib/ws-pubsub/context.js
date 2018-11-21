const WebSocket = require('ws')

module.exports = class ConnectionCtx {
  constructor (connection) {
    this._connection = connection
  }

  send (message) {
    // TODO: should check ready state
    if (this._connection.readyState === WebSocket.OPEN) {
      try {
        this._connection.send(message)
      } catch (err) {
        console.error('error on send ws', err)
      }
    } else {
      console.log('ready state: ', this._connection.readyState)
    }
  }
}
