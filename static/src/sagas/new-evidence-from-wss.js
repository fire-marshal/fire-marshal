import _ from 'lodash'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { insertItem } from '../reducers/entities/evidences'
import { processItem } from '../reducers/entities/model'
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
function * newEvidenceFromWss (action) {
  console.log('take new entity from wss', action)

  const item = processItem(action.payload)

  // we have 2 options here: real-time and on-demand update

  // - in case of real-time:
  // find the place for new item in a list of ids
  // - in case of on-demand:
  // add to the waiting list
  const realTime = false
  const sortBy = ['when', 'estimation']

  let index
  if (realTime) {
    index = yield call(findPlaceToInsertItemInSortedList, item, sortBy)
  }

  yield put(insertItem({ index, item, realTime }))
}

/**
 * Find index to insert new item in sorted list
 *
 * @param item {object}
 * @param sortBy {array} sorted by field
 *
 * @returns {IterableIterator<*>}
 */
function * findPlaceToInsertItemInSortedList (item, sortBy) {
  const byIds = yield select(evidencesSelector.getEvidencesByIdRaw)
  const sortedIds = yield select(updatesFeedSelector.getSortedIdsRaw)
  const newValue = _.get(item, sortBy)

  function getInplaceValue (idx) {
    const inplaceId = sortedIds.get(idx)
    return newValue - byIds.getIn([inplaceId].concat(sortBy))
  }

  return binarySearchOfCallback(
    getInplaceValue, sortedIds.size
  )
}

export function * sagas () {
  yield takeEvery(wssActions.actionTypes.ADD, newEvidenceFromWss)
}
