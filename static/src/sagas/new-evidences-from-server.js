import _ from 'lodash'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { actionTypes, insertItems } from '../reducers/entities/evidences'
import { processItem } from '../reducers/entities/model'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'

function * receiveEvidences (action) {
  console.log('receive evidences', action)

  let items = action.payload.items.map(processItem)
  const total = action.payload.total

  // we should sort items because we would need to
  // hold sorting property on inserting
  items = _.sortBy(items, ['when', 'estimation'].join('.'))

  const indexes = yield call(findPlaceToInsertItemsInSortedList, items)
  yield put(insertItems({ indexes, items, total }))
}

function * findPlaceToInsertItemsInSortedList (items) {
  console.log('findPLaceTOInsertItemsInSortedList', items)
  const sortedIds = yield select(updatesFeedSelector.getSortedIdsRaw)
  // TODO: find the place where should we place item
  return items.map(item => sortedIds.size)
}

export function * sagas () {
  yield takeEvery(actionTypes.APPEND_EVIDENCES_RECEIVE, receiveEvidences)
}
