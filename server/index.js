const { server } = require('./lib')

const config = {
  server: {
    port: 8080
  }
}

server.bootstrap(config)
