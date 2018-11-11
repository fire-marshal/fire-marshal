import * as app from './app'

import './main.scss'

app.bootstrap(document.getElementById('root'))

// try simple ping-pong with wss

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
  c.close()
}

c.onclose = (...args) => {
  console.info('ws: onclose')
  console.info(args)
}
