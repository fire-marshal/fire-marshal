import Immutable from 'immutable'
import _ from 'lodash'

const wssActions = require('../../../wss/lib/agents/evidences/actions');

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'
import asyncReducer from '../async-queue/reducer-builder'
import { getIdsRaw } from '../selectors/evidences'
import { prepareUrl } from '../utils/api-url-processor'

const namespace = require('../utils/get-namespace')()

//
// actions
//

// append new items to already existing list
export const APPEND_EVIDENCES_REQUEST = `${namespace}/EVIDENCES.APPEND:REQUEST`
export const APPEND_EVIDENCES_RECEIVE = `${namespace}/EVIDENCES.APPEND:RECEIVE`
export const APPEND_EVIDENCES_ERROR = `${namespace}/EVIDENCES.APPEND:ERROR`

export const SUBSCRIBE_EVIDENCES = `${namespace}/EVIDENCES.SUBSCRIBE`
export const UNSUBSCRIBE_EVIDENCES = `${namespace}/EVIDENCES.UNSUBSCRIBE`

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

export const subscribeEvidences = (payload) => ({
  type: SUBSCRIBE_EVIDENCES,
  payload,
  meta: {
    createdAt: Date.now(),
    socket: true,
  }
})

export const unsubscribeEvidences = () => ({
  type: UNSUBSCRIBE_EVIDENCES,
  meta: {
    createdAt: Date.now(),
    socket: true,
  }
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
      ({ res }, previousData) => {
        // we should left only new items
        const previousIds = previousData.get('ids')
        let newItems = filterByIds(res.items, previousIds)
        newItems = newItems.map(processItem)
        const newIds = getIds(newItems)

        return Immutable.Map({
          ids: previousIds.union(newIds),
          items: previousData.get('items').push(...newItems),
          total: res.total,
          startDate: getStartDate(res.items),
        })
      }
    ),

    [wssActions.actionTypes.ADD]: (state, action) => {
      const newItem = processItem(action.payload)
      if (isOldItem(state, newItem)) {
        console.log(`we already have ${newItem.id}`)
        return state;
      } else {
        console.log(`it is new item ${newItem.id}`)
        return state
          .update('data', data => data
            .update('ids', ids => ids.add(newItem.id))
            .update('items', items => items.unshift(Immutable.fromJS(newItem)))
            .update('total', total => total + 1)
          )
      }
    }
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

/**
 * Is it new item?
 *
 * @param state
 * @param item
 * @returns {*}
 */
function isOldItem (state, item) {
  const ids = getIdsRaw(state)
  return ids && ids.has(item.id)
}

/**
 * process each new item
 *
 * @param item
 * @returns {{id: *}}
 */
function processItem (item) {
  return { ...item, id: item._id };
}
