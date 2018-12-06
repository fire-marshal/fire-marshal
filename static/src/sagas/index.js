import { select, takeEvery } from 'redux-saga/effects'

import * as evidencesSelector from '../selectors/evidences'

const wssActions = require('../../../wss/lib/agents/evidences/actions')

/**
 * get new entity from wss
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function * takeNewEntityFromWSS (action) {
  console.log('take new entity from wss', action)
  console.log('evidences by id:', yield select(evidencesSelector.getEvidencesByIdRaw))

  // we have 2 options here: real-time and on-demand update

  // in case of realtime:
  // TODO: find the place for new item in a list of ids

  // in case of on-demand:
  // TODO: add to the waiting list
}

function * sagas () {
  console.log('run all sagas')
  yield takeEvery(wssActions.actionTypes.ADD, takeNewEntityFromWSS)
}

export default sagas
