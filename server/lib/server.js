const Koa = require('koa')
const mount = require('koa-mount')

const routers = require('./routers')

/**
 * Run server
 *
 * @param config
 * @returns {module.Application|*}
 */
function bootstrap (config) {
  const app = new Koa()

  // logger
  app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
  })

  // x-response-time
  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
  })

  app.use(mount('/api', routers()))

  app.use(async ctx => {
    ctx.body = 'Hello World'
  })

  app.listen(config.server.port)

  return app
}

module.exports = {
  bootstrap
}
