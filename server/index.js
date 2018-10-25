const { server } = require('./lib/index')

const config = {
  server: {
    port: 8080
  }
}

server.bootstrap(config)
