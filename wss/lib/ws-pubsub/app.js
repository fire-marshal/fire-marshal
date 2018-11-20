// const namespace = require('../../package').name
// const serverVersion = require('../../package').version

const ConnectionCtx = require('./context')
const { serverEvents, WSServer } = require('./server')

class WSApp {
  constructor () {
    this._connectConsumers = []
    this._disconnectConsumers = []
    this._messageConsumers = []

    this._onConnect = this._onConnect.bind(this)
    this._onDisconnect = this._onDisconnect.bind(this)
    this._onMessage = this._onMessage.bind(this)
  }

  onConnect (middleware) {
    this._connectConsumers.push(middleware)
  }

  onDisconnect (middleware) {
    this._disconnectConsumers.push(middleware)
  }

  onMessage (middleware) {
    this._messageConsumers.push(middleware)
  }

  use (middleware) {
    if (middleware.onConnect) {
      this._connectConsumers.push(middleware.onConnect)
    }

    if (middleware.onDisconnect) {
      this._disconnectConsumers.push(middleware.onDisconnect)
    }

    if (middleware.onMessage) {
      this._messageConsumers.push(middleware.onMessage)
    }
  }

  listen (port) {
    // TODO: create http server to use it for HTTPS
    this._wss = new WSServer({
      context: c => new ConnectionCtx(c),
      port
    })

    this._wss.on(serverEvents.CONNECT, this._onConnect)
    this._wss.on(serverEvents.DISCONNECT, this._onDisconnect)
    this._wss.on(serverEvents.MESSAGE, this._onMessage)
  }

  _onConnect (ctx) {
    this._feedContextToConsumers(this._connectConsumers, ctx)
  }

  _onDisconnect (ctx) {
    this._feedContextToConsumers(this._disconnectConsumers, ctx)
  }

  _onMessage ({ context, message }) {
    context.message = message
    this._feedContextToConsumers(this._messageConsumers, context)
  }

  _feedContextToConsumers (consumers, ctx) {
    this._processPipeline([...consumers].reverse(), ctx)
      .then((res) => {
        // console.log('result of pipeline', res)
      }, (err) => {
        console.log('error of pipeline', err)
      })
  }

  async _processPipeline (pipeline, ctx) {
    const next = async function () {
      const middleware = pipeline.shift()
      if (middleware) {
        await middleware(ctx, next)
      }
    }

    while (pipeline.length > 0) {
      await next()
    }

    return ctx
  }
}

module.exports = WSApp
