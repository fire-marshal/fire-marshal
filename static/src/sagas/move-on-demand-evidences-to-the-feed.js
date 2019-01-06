import _ from 'lodash'
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

  const { ids, indexes } = yield call(findPlaceToInsertIds, sortBy)

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
export function * findPlaceToInsertIds (sortBy) {
  const incomingUnsortedIds = yield select(updatesFeedSelector.getOnDemand)
  const existingSortedIds = yield select(updatesFeedSelector.getSortedIds)
  const byIds = yield select(evidencesSelector.getEvidencesById)

  const values = Array.from(incomingUnsortedIds).map(id => _.get(byIds, [id].concat(sortBy)))

  // we could get unsorted ids so we should make them sorted
  const sortedIdAndValues = _.zip(incomingUnsortedIds, values).sort(
    ([id1, value1], [id2, value2]) => value2 - value1
  )

  // and then map to pair of id and index for insertion
  const [ ids, indexes ] = _.unzip(sortedIdAndValues.map(
    ([id, itemValue]) => {
      function compareInplaceValue (idx) {
        const inplaceId = existingSortedIds[idx]
        return itemValue - _.get(byIds, [inplaceId].concat(sortBy))
      }

      return [id, binarySearchOfCallback(
        compareInplaceValue,
        existingSortedIds.length
      )]
    }
  ))

  return {
    ids,
    indexes
  }
}

export function * sagas () {
  yield takeEvery(actionTypes.MOVE_ON_DEMAND_IDS_TO_THE_FEED, moveOnDemandToTheFeed)
}
