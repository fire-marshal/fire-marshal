import 'core-js/shim' // included < Stage 4 proposals
import 'regenerator-runtime/runtime'

import createHistory from 'history/createBrowserHistory'
import React from 'react'
import ReactDOM from 'react-dom'

import { configureStore } from './configure-store'
import { reselectToolsSetup } from './reselect-tools-setup'

/**
 * Bootstrap react app
 *
 * @param targetElm
 */
export function bootstrap (targetElm) {
  const history = createHistory()
  const store = configureStore({}, history)

  if (__DEV__) {
    reselectToolsSetup(store)
  }

  let renderRoot = () => {
    import('./router')
      .then(AppRouterModule => {
        const AppRouter = AppRouterModule.default
        ReactDOM.render(
          <AppRouter history={history} store={store}/>,
          targetElm
        )
      })
  }

  if (module.hot && __DEV__) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderError = (error) => {
      import('redbox-react')
        .then(RedBox => {
          ReactDOM.render(
            <RedBox error={error}/>,
            targetElm
          )
        })
    }

    const render = () => {
      try {
        renderRoot()
      } catch (error) {
        renderError(error)
      }
    }

    module.hot.accept('./router', () => {
      console.info('update components')
      setTimeout(render)
    })
  }

  renderRoot()
}
