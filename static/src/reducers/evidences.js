import Immutable from 'immutable'
import _ from 'lodash'

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'
import asyncReducer from '../async-queue/reducer-builder'

import { prepareUrl } from '../utils/api-url-processor'

//
// actions
//

// append new items to already existing list
export const APPEND_EVIDENCES_REQUEST = 'EVIDENCES.APPEND:REQUEST'
export const APPEND_EVIDENCES_RECEIVE = 'EVIDENCES.APPEND:RECEIVE'
export const APPEND_EVIDENCES_ERROR = 'EVIDENCES.APPEND:ERROR'

//
// action creators
//

export const fetchEvidences = fetchActionSimplified({
  getUrl: ({ lat, long, startDateISO }) => {
    let ops = null;
    if (startDateISO) {
      ops = { start_date: startDateISO };
    }

    return prepareUrl(config.evidences.api_url_with_start_date, {
      lat, long, ops,
    })
  },

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
    data: {
      ids: Immutable.Set(),
      items: [],
      total: 0,
      startDate: null,
    },
    updateAt: null
  }),
  {
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
          startDate: getStartDate(res.items),
        })
      }
    )
  }
)

/**
 *
 * TODO: should find a single place for item's structure functionality
 *
 */

/**
 * Get start data
 *
 * @private
 * @param items
 * @returns {Date}
 */
function getStartDate (items) {
  const item = _.last(items)
  if (!item) {
    return null
  }
  return new Date(item.when.estimation)
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
