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

  const onDemandIds = yield select(updatesFeedSelector.getOnDemand)
  const indexes = yield call(findPlaceToInsertIds, onDemandIds, sortBy)

  yield put(insertIdsToTheFeed({
    indexes: indexes.reverse(),
    ids: onDemandIds.reverse()
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

  return ids.map(
    id => {
      const itemValue = byIds.getIn([id].concat(sortBy))

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
