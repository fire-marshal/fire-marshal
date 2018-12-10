import { call, put, select, takeEvery } from 'redux-saga/effects'

import { insertItem } from '../reducers/ui/updates-feed'
import * as evidencesSelector from '../selectors/entities/evidences'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'
import { binarySearchOfCallback } from '../utils/binary-search'

const wssActions = require('../../../wss/lib/agents/evidences/actions')

/**
 * get new entity from wss
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function * newEntityFromWSS (action) {
  console.log('take new entity from wss', action)

  const item = action.payload

  // we have 2 options here: real-time and on-demand update

  // in case of real-time:
  // find the place for new item in a list of ids
  const index = yield call(findPlaceToInsertItemInSortedList, item)
  yield put(insertItem({ index, id: item._id }))

  // in case of on-demand:
  // TODO: add to the waiting list
}

/**
 * Find index to insert new item in sorted list
 *
 * @param item {object}
 * @param sortBy {array} sorted by field
 *
 * @returns {IterableIterator<*>}
 */
function * findPlaceToInsertItemInSortedList (item, sortBy = ['when', 'estimation']) {
  const byIds = yield select(evidencesSelector.getEvidencesByIdRaw)
  const sortedIds = yield select(updatesFeedSelector.getSortedIdsRaw)

  function getInplaceValue (idx) {
    const inplaceId = sortedIds.get(idx)
    return byIds.getIn([inplaceId].concat(sortBy))
  }

  return binarySearchOfCallback(getInplaceValue, sortedIds.size, item)
}

export function * sagas () {
  yield takeEvery(wssActions.actionTypes.ADD, newEntityFromWSS)
}
