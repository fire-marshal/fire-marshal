import Immutable from 'immutable'
import _ from 'lodash'

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'
import asyncReducer from '../async-queue/reducer-builder'

import { prepareUrl } from '../requests/api-url-processor'

//
// actions
//

// add new list of items
export const NEW_EVIDENCES_REQUEST = 'EVIDENCES.NEW:REQUEST'
export const NEW_EVIDENCES_RECEIVE = 'EVIDENCES.NEW:RECEIVE'
export const NEW_EVIDENCES_ERROR = 'EVIDENCES.NEW:ERROR'

// append items to already existing list
export const APPEND_EVIDENCES_REQUEST = 'EVIDENCES.APPEND:REQUEST'
export const APPEND_EVIDENCES_RECEIVE = 'EVIDENCES.APPEND:RECEIVE'
export const APPEND_EVIDENCES_ERROR = 'EVIDENCES.APPEND:ERROR'

//
// action creators
//

export const fetchEvidences = fetchActionSimplified({
  getUrl: ({ lat, long }) => prepareUrl(config.evidences.api_url, {
    lat, long
  }),

  actions: [NEW_EVIDENCES_REQUEST, NEW_EVIDENCES_RECEIVE, NEW_EVIDENCES_ERROR]
})

export const fetchEvidencesAfterDate = fetchActionSimplified({
  getUrl: ({ lat, long, startDate }) => prepareUrl(config.evidences.api_url_with_start_date, {
    lat, long, startDate
  }),

  actions: [APPEND_EVIDENCES_REQUEST, APPEND_EVIDENCES_RECEIVE, APPEND_EVIDENCES_ERROR]
})

//
// reducers
//

// TODO: data structure
// it would be better to store information about some bigger events or related (connected)
//
export default createReducer(
  Immutable.fromJS({
    invalid: true,
    error: null,
    data: null,
    updateAt: null
  }),
  {
    ...asyncReducer(
      [NEW_EVIDENCES_REQUEST, NEW_EVIDENCES_RECEIVE, NEW_EVIDENCES_ERROR],
      (res) => Immutable.fromJS({
        ids: Immutable.Set(getIds(res.items)),
        items: res.items,
        total: res.total,
        lastDate: getLastDate(res.items)
      })
    ),

    ...asyncReducer(
      [APPEND_EVIDENCES_REQUEST, APPEND_EVIDENCES_RECEIVE, APPEND_EVIDENCES_ERROR],
      (res, previousData) => {
        // we should left only new items
        const previousIds = previousData.get('ids')
        const newItems = filterByIds(res.items, previousIds)
        const newIds = getIds(newItems)

        return Immutable.Map({
          ids: previousIds.union(newIds),
          items: previousData.get('items').push(...newItems),
          total: res.total,
          lastDate: getLastDate(res.items)
        })
      }
    )
  }
)

/**
 * TODO: should find a single place for item's structure functionality
 *
 * Get item's date
 *
 * @private
 * @param items
 * @returns {null}
 */
function getLastDate (items) {
  const item = _.last(items)
  if (!item) {
    return null
  }
  return item.when.estimation
}

/**
 * get all ids
 *
 * @param items {Array}
 * @returns {Array}
 */
function getIds (items) {
  return items.map(i => i._id)
}

/**
 * Filter items by Immutable.Set of ids
 *
 * @param items {Array}
 * @param ids {Immutable.Set}
 * @returns {Array}
 */
function filterByIds (items, ids) {
  return items.filter(i => !ids.has(i._id))
}
