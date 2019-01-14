// Borrowed from https://gist.github.com/hoschi/6538249ad079116840825e20c48f1690
// Note that reloading sagas has several issues/caveats to be aware of.
// See https://github.com/yelouafi/redux-saga/issues/22#issuecomment-218737951 for discussion.

import { take, fork, cancel } from 'redux-saga/effects'

import rootSaga from './root-saga'

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR'

function createAbortableSaga (saga) {
  if (__DEV__) {
    return function * main () {
      const sagaTask = yield fork(saga)

      yield take(CANCEL_SAGAS_HMR)
      yield cancel(sagaTask)
    }
  } else {
    return saga
  }
}

export const SagaManager = {
  startSagas (sagaMiddleware) {
    sagaMiddleware.run(createAbortableSaga(rootSaga))
  },

  cancelSagas (store) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR
    })
  }
}
