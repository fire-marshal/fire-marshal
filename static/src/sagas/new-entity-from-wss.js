import { select, takeEvery } from 'redux-saga/effects'
import * as evidencesSelector from '../selectors/evidences'

const wssActions = require('../../../wss/lib/agents/evidences/actions')

/**
 * get new entity from wss
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function * newEntityFromWSS (action) {
  console.log('take new entity from wss', action)
  console.log('evidences by id:', yield select(evidencesSelector.getEvidencesByIdRaw))

  // we have 2 options here: real-time and on-demand update

  // in case of real-time:
  // TODO: find the place for new item in a list of ids

  // in case of on-demand:
  // TODO: add to the waiting list
}

export function * sagas () {
  console.log('new entity from ')
  yield takeEvery(wssActions.actionTypes.ADD, newEntityFromWSS)
}
