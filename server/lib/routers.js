'use strict'

const mount = require('koa-mount')
const Router = require('koa-trie-router')

const home = require('./home')
const fires = require('./fires')

module.exports = () => {
  const router = new Router()
  router.use(mount('/', home()))
  router.use(mount('/fires', fires()))
  return router.middleware()
}
