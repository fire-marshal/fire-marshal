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

  let renderRoot = async () => {
    const AppRouter = (await import('./router')).default
    ReactDOM.render(
      <AppRouter history={history} store={store}/>,
      targetElm
    )
  }

  if (module.hot && __DEV__) {
    // inspired by
    // https://gist.github.com/markerikson/dc6cee36b5b6f8d718f2e24a249e0491
    // of @markerikson
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderError = async (error) => {
      const RedBox = await import('redbox-react')
      ReactDOM.render(
        <RedBox error={error}/>,
        targetElm
      )
    }

    const render = async () => {
      try {
        await renderRoot()
      } catch (error) {
        await renderError(error)
      }
    }

    module.hot.accept('./router', () => {
      console.info('update components')
      setTimeout(render)
    })
  }

  renderRoot()
}
