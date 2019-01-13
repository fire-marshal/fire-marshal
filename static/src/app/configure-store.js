import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'

import { wsMiddleware } from '../middlewares/ws'
import createRootReducers from '../reducers'
import rootSaga from '../sagas'

export function configureStore (initialState = {}, history) {
  /* eslint-disable no-underscore-dangle */
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

  const reducer = createRootReducers(history)
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer,

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

  // hot reloading
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', async () => {
      console.info('update reducers')
      const createRootReducers = (await import('../reducers')).default
      store.replaceReducer(createRootReducers(history))
    })

    module.hot.accept('../sagas', () => {
      console.info('TODO:update sagas')
      // SagaManager.cancelSagas(store);
      // require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
    })
  }

  sagaMiddleware.run(rootSaga)

  return store
}
