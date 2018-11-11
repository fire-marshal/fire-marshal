const _ = require('lodash')
const WebSocket = require('ws')

function bootstrap (config) {
  const wss = new WebSocket.Server({ port: _.get(config, 'wss.port', 8080) })

  wss.on('connection', ws => {
    console.log('wss: connection')
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
      ws.send('hey')
    })

    ws.send('ho!')
  })
}

module.exports = {
  bootstrap
}
