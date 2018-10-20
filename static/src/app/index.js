import React from 'react'
import ReactDOM from 'react-dom'

import AppContainer from './container'

/**
 * Bootstrap react app
 *
 * @param targetElm
 */
export function bootstrap (targetElm) {
  ReactDOM.render(<AppContainer />, targetElm)
}
