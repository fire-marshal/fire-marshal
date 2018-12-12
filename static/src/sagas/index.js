import { all } from 'redux-saga/effects'

import { sagas as newEvidenceFromWSSSagas } from './new-evidence-from-wss'
import { sagas as newEvidencesFromServer } from './new-evidences-from-server'

/**
 * all sagas are here
 *
 * @returns {IterableIterator<*>}
 */
function * rootSaga () {
  console.log('run all sagas')
  yield all([
    newEvidenceFromWSSSagas(),
    newEvidencesFromServer()
  ])
}

export default rootSaga
