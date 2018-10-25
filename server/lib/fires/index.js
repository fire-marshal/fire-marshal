const Router = require('koa-trie-router')

const fetchFires = require('./fetch-fires')

module.exports = () => {
  const router = new Router()
  router.get(fetchFires())
  // router.get(fetchUser())
  // router.post(insertUser())
  // router.put(updateUser())
  // router.del(deleleUser())
  return router.middleware()
}
