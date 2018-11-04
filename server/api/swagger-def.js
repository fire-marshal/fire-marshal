const packagejson = require('../package')

module.exports = {
  info: {
    title: packagejson.name,
    version: packagejson.version,
    description: packagejson.description
  },

  openapi: '3.0.1'
  // host, // Host (optional)
  // basePath: '/', // Base path (optional)
}
