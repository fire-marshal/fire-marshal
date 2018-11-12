const _ = require('lodash')

const routers = require('./routes')
const { mount, WSPubSub } = require('./ws-pubsub')

function bootstrap (config) {
  // TODO: get DB interface
  const db = {}
  const app = new WSPubSub()
  // FIXME: should be:
  // TODO: logger on each connect/disconnect (similar things for sending message)
  // app.use(async (ctx, next) => {
  // // connect
  //   await next()
  // // disconnect
  //   const rt = ctx.response.get('X-Response-Time')
  //   console.log(`${ctx.method} ${ctx.url} - ${rt}`)
  // })

  // TODO: should we pass each message through app.use?

  app.use(mount('/api', routers(config, { db })))

  app.listen(_.get(config, 'server.port', 8000))
  return app
}

module.exports = {
  bootstrap
}
