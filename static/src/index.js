import * as app from './app'

import './main.scss'

/**
 * FIXME: try simple ping-pong with wss and remove this function
 */
function bootstrapWS () {
  console.log('bootstrapWS')

  const c = new WebSocket('ws://localhost:8082/something')

  c.onerror = error => {
    console.info('ws: onerror')
    console.info(error)
  }

  c.onopen = () => {
    console.info('ws: onopen')
    setTimeout(() => c.send('hey'))
  }

  c.onmessage = (...args) => {
    console.info('ws: onmessage')
    console.info(args)
    // c.close()
    setTimeout(() => {
      c.send(`here is my random : ${Math.random()}`)
    }, 3 * 1000)
  }

  c.onclose = (...args) => {
    console.info('ws: onclose')
    console.info(args)
  }
}

bootstrapWS()

app.bootstrap(document.getElementById('root'))
