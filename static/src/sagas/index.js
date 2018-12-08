import { all } from 'redux-saga/effects'

import { sagas } from './new-entity-from-wss'

/**
 * all sagas are here
 *
 * @returns {IterableIterator<*>}
 */
function * rootSaga () {
  console.log('run all sagas')
  yield all([
    sagas()
  ])
}

export default rootSaga
