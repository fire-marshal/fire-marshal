const { Router } = require('../ws-pubsub')

module.exports = (config, app) => {
  const router = new Router()
  router.get()
  return router.middleware()
}
