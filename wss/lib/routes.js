const evidenices = require('./evidences')
const { mount, Router } = require('./ws-pubsub')

module.exports = (config, app) => {
  const router = new Router()
  router.use(mount('/v1/fires', evidenices(config, app)))
  return router.middleware()
}
