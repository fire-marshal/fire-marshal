const Koa = require('koa')

/**
 * Run server
 *
 * @param config
 * @returns {module.Application|*}
 */
function bootstrap (config) {
  const app = new Koa()

  app.use(async ctx => {
    ctx.body = 'Hello World'
  })

  app.listen(config.server.port)

  return app
}

module.exports = {
  bootstrap
}
