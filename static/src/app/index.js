import 'core-js/shim' // included < Stage 4 proposals
import 'regenerator-runtime/runtime'

import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router/immutable'
import createHistory from 'history/createBrowserHistory'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import * as ReselectTools from 'reselect-tools'

import rootReducers from '../reducers'
import rootSaga from '../sagas'
import * as selectors from '../selectors'
import { wsMiddleware } from '../middlewares/ws'

import AppRouter from './router'

/**
 * Bootstrap react app
 *
 * @param targetElm
 */
export function bootstrap (targetElm) {
  const history = createHistory()

  const initialState = Immutable.Map()

  /* eslint-disable ndo-underscore-dangle */
  let composeEnhancers
  if (
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    // could give performance problem so we disable it production
    process.env.NODE_ENV !== 'production'
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  } else {
    composeEnhancers = compose
  }
  /* eslint-enable */

  const reducerAndRouter = connectRouter(history)(rootReducers)
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducerAndRouter,

    initialState,

    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        sagaMiddleware,
        wsMiddleware({
          url: 'ws://localhost:8082/something'
        })
      )
    )
  )

  sagaMiddleware.run(rootSaga)

  // TODO: should disable in production
  if (process.env.NODE_ENV !== 'production') {
    ReselectTools.getStateWith(() => store.getState())
    Object.values(selectors).forEach(selector => ReselectTools.registerSelectors(selector))
  }

  // hot reloading
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducerAndRouter))
  }

  ReactDOM.render(
    <AppRouter ConnectedRouter={ConnectedRouter} history={history} store={store} />,
    targetElm
  )
}
