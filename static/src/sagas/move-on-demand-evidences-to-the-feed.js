import { call, put, select, takeEvery } from 'redux-saga/effects'

import { actionTypes, clearOnDemand, insertIdsToTheFeed } from '../reducers/ui/updates-feed'
import * as evidencesSelector from '../selectors/entities/evidences'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'
import { binarySearchOfCallback } from '../utils/binary-search'

/**
 * get on demand ids and move them to the feed ids
 *
 * @returns {IterableIterator<*>}
 */
export function * moveOnDemandToTheFeed () {
  console.log('move on demand to the feed')

  const sortBy = ['when', 'estimation']

  const ids = yield select(updatesFeedSelector.getOnDemand)
  console.log('ids', ids)

  const indexes = yield call(findPlaceToInsertIds, ids, sortBy)
  console.log('indexes', indexes)

  yield put(insertIdsToTheFeed({
    ids: ids.reverse(),
    indexes: indexes.reverse()
  }))

  yield put(clearOnDemand())
}

/**
 * find place where to put ids
 *
 * @param ids
 * @param sortBy
 * @returns {IterableIterator<*>}
 */
export function * findPlaceToInsertIds (ids, sortBy) {
  const sortedIds = yield select(updatesFeedSelector.getSortedIdsRaw)
  const byIds = yield select(evidencesSelector.getEvidencesByIdRaw)

  // TODO: should sort ids by sorted value

  return ids.map(
    id => {
      const itemValue = byIds.getIn([id].concat(sortBy))

      console.log('id', id)
      console.log('itemValue', itemValue)

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
  yield takeEvery(actionTypes.MOVE_ON_DEMAND_IDS_TO_THE_FEED, moveOnDemandToTheFeed)
}
