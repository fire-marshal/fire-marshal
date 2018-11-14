import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router/immutable'
import createHistory from 'history/createBrowserHistory'
import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import { combineReducers } from 'redux-immutable'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'
import { wsMiddleware } from '../ws'

import AppRouter from './router'

/**
 * Bootstrap react app
 *
 * @param targetElm
 */
export function bootstrap (targetElm) {
  const history = createHistory()

  const rootReducers = combineReducers(reducers)
  const initialState = Immutable.Map()

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (typeof window !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  /* eslint-enable */

  const store = createStore(
    connectRouter(history)(rootReducers),

    initialState,

    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        wsMiddleware({
          url: 'ws://localhost:8082/something'
        })
      )
    )
  )

  ReactDOM.render(
    <AppRouter ConnectedRouter={ConnectedRouter} history={history} store={store} />,
    targetElm
  )
}
