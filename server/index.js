const { server, wss } = require('./lib/index')
const config = require('./lib/config')

server.bootstrap(config)
wss.bootstrap(config)
