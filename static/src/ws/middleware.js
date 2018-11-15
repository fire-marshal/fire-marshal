/**
 * After all it should be mover to https://github.com/good-app-foundation/
 */

import { ConnectionManager } from './manager'

export default function createWSMiddleware (options = {
  url: 'wss://localhost:8765'
}) {
  return store => {
    const manager = new ConnectionManager(store, options)

    return next => action => {
      // if action has meta socket attribute we would sent it websocket server
      if (action.meta && action.meta.socket) {
        // this action should be send to websocket server
        manager.send(action)
      }

      manager.handle(action)

      return next(action)
    }
  }
}
