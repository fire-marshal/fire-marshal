import { all } from 'redux-saga/effects'

import { sagas as moveOnDemandEvidencesToTheFeed } from './move-on-demand-evidences-to-the-feed'
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
    moveOnDemandEvidencesToTheFeed(),
    newEvidenceFromWSSSagas(),
    newEvidencesFromServer()
  ])
}

export default rootSaga
