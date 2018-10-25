'use strict'

const mount = require('koa-mount')
const Router = require('koa-trie-router')

const home = require('./home')
const fires = require('./fires')

module.exports = (config) => {
  const router = new Router()
  router.use(mount('/', home(config)))
  router.use(mount('/fires', fires(config)))
  return router.middleware()
}
