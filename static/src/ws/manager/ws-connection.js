export default class WSConnection {
  constructor ({ url }) {
    console.log('bootstrapWS')

    this._ws = new WebSocket(url)

    this._ws.onerror = error => {
      console.info('ws: onerror')
      console.info(error)
    }

    this._ws.onopen = () => {
      console.info('ws: onopen')
    }

    this._ws.onmessage = (...args) => {
      console.info('ws: onmessage')
      console.info(args)
      // c.close()
    }

    this._ws.onclose = (...args) => {
      console.info('ws: onclose')
      console.info(args)
    }
  }

  send (data) {
    this._ws.send(data)
  }
}
