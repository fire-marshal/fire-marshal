const _ = require('lodash')

const { WSApp } = require('./ws-pubsub')
const { reduxMiddleware } = require('./redux-middleware')
const { evidencesAgent } = require('./agents/evidences')

function bootstrap (config) {
  // TODO: get DB interface
  const db = {}
  const app = new WSApp()

  app.use({
    onConnect (ctx) {
      ctx.sessionStart = Date.now()
    },
    onDisconnect (ctx) {
      console.log('connection time', Date.now() - ctx.sessionStart)
    }
  })

  app.onMessage(async (ctx, next) => {
    ctx.messageStart = Date.now()
    await next()
    console.log('message processing time', Date.now() - ctx.messageStart)
  })

  app.use(reduxMiddleware())

  app.onMessage((ctx) => {
    if (ctx.action.meta && ctx.action.meta.socket) {
      ctx.action.meta.receivedAt = Date.now()
    }
  })

  app.use(evidencesAgent({ db }))

  app.listen(_.get(config, 'server.port', 8000))
  return app
}

module.exports = {
  bootstrap
}
