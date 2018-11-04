'use strict'

const mount = require('koa-mount')
const Router = require('koa-trie-router')

const home = require('./home')
const fires = require('./fires')

module.exports = (config, app) => {
  const router = new Router()
  router.use(mount('/', home(config, app)))
  router.use(mount('/v1/fires', fires(config, app)))
  return router.middleware()
}
