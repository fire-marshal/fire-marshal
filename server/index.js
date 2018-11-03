const { server } = require('./lib/index')

const config = {
  mongo: {
    // TODO: should be special (non-root) user
    url: 'mongodb://root:example@mongo:27017/marshal',
    db: 'marshal'
  },

  server: {
    port: 8080
  }
}

server.bootstrap(config)
