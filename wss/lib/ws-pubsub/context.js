module.exports = class ConnectionCtx {
  constructor (connection) {
    this._connection = connection
  }

  send (message) {
    // TODO: should check ready state
    console.log('ready state: ', this._connection.readyState)

    try {
      this._connection.send(message)
    } catch (err) {
      console.error('error on send ws', err)
    }
  }
}
