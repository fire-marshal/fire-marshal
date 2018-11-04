const { server } = require('./lib/index')
const config = require('./lib/config')

server.bootstrap(config)
