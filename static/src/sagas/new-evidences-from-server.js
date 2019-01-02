import _ from 'lodash'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { actionTypes, insertItems } from '../reducers/entities/evidences'
import { processItem } from '../reducers/entities/model'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'
import * as evidencesSelector from '../selectors/entities/evidences'
import { binarySearchOfCallback } from '../utils/binary-search'

/**
 * get new entities from server
 *
 * @param action
 * @returns {IterableIterator<*>}
 */
function * receiveEvidences (action) {
  console.log('receive evidences', action)

  let items = action.payload.items.map(processItem)
  const total = action.payload.total

  const realTime = true
  const sortBy = ['when', 'estimation']

  // we should sort items because we would need to
  // hold sorting property on inserting
  items = _.sortBy(items, sortBy.join('.')).reverse()

  const indexes = yield call(findPlaceToInsertItemsInSortedList, items, sortBy)
  yield put(insertItems({
    indexes: indexes.reverse(),
    items: items.reverse(),
    realTime,
    total
  }))
}

/**
 * Find indexes to insert new items in sorted list
 *
 * @param items
 * @param sortBy
 * @returns {IterableIterator<*>}
 */
function * findPlaceToInsertItemsInSortedList (items, sortBy) {
  console.log('findPLaceTOInsertItemsInSortedList', items)

  const byIds = yield select(evidencesSelector.getEvidencesByIdRaw)
  const sortedIds = yield select(updatesFeedSelector.getSortedIds)

  return items.map(
    item => {
      if (byIds.has(item.id)) {
        // don't nest duplication entities
        return undefined
      }

      const itemValue = _.get(item, sortBy)

      function compareInplaceValue (idx) {
        const inplaceId = sortedIds.get(idx)
        return itemValue - byIds.getIn([inplaceId].concat(sortBy))
      }

      return binarySearchOfCallback(
        compareInplaceValue,
        sortedIds.size
      )
    }
  )
}

export function * sagas () {
  yield takeEvery(actionTypes.APPEND_EVIDENCES_RECEIVE, receiveEvidences)
}
