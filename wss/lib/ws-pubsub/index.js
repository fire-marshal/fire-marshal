/**
 * Small lib with similar to Koa.js API
 * Koa has websocket project https://github.com/koajs/koa.io
 * but it is based on socket.io, but this one based on ws,
 * which much more native for node.js
 */

module.exports = {
  mount: require('./mount'),
  WSPubSub: require('./app'),
  Router: require('./router')
}
