import Immutable from 'immutable'
import _ from 'lodash'

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'
import asyncReducer from '../async-queue/reducer-builder'
import { getIdsRaw } from '../selectors/evidences'
import { prepareUrl } from '../utils/api-url-processor'
import { binarySearchOfCallback } from '../utils/binary-search'

const wssActions = require('../../../wss/lib/agents/evidences/actions')

const namespace = require('../../package').name

//
// actions
//

// append new items to already existing list
export const actionTypes = {
  APPEND_EVIDENCES_REQUEST: `${namespace}/EVIDENCES.APPEND:REQUEST`,
  APPEND_EVIDENCES_RECEIVE: `${namespace}/EVIDENCES.APPEND:RECEIVE`,
  APPEND_EVIDENCES_ERROR: `${namespace}/EVIDENCES.APPEND:ERROR`
}

//
// action creators
//

export const fetchEvidences = fetchActionSimplified({
  getUrl: ({ lat, long, startDateISO }) => {
    let ops = null
    if (startDateISO) {
      ops = { start_date: startDateISO }
    }

    return prepareUrl(config.evidences.api_url_with_start_date, {
      lat, long, ops
    })
  },

  actions: [actionTypes.APPEND_EVIDENCES_REQUEST, actionTypes.APPEND_EVIDENCES_RECEIVE, actionTypes.APPEND_EVIDENCES_ERROR],

  /**
   * Filter out duplications
   *
   * @param payload
   * @param getState
   * @param res
   *
   * @returns {{newIds: Array, newItems: Array}}
   */
  process: ({ payload, getState, res }) => {
    const state = getState()
    const previousIds = getIdsRaw(state)
    let newItems = res.items
    newItems = filterByIds(newItems, previousIds)
    newItems = newItems.map(processItem)
    return {
      newItems,
      total: res.total
    }
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
      // items by its id
      byId: Immutable.Map(),
      // sorted list of ids
      sortedIds: Immutable.List(),

      // TODO: this state depends on the entity state
      // (because visibleIds should be sorted)
      // so question is should we extend entity state with its visibility state
      // or create ui state which would know about entity state?
      visibility: {
        realtime: false,
        delayedIds: Immutable.List(),
        visibleIds: Immutable.List()
      },

      // @deprecated
      // sorted list of items
      ids: Immutable.Set(),
      // @deprecated
      items: [],
      // total (globally, not only on this client) number of items
      total: 0,
      // @deprecated
      // TODO: it seems we can derive this value from sorted ids and byId
      startDate: null
    }
  }),
  {
    ...asyncReducer(
      [
        actionTypes.APPEND_EVIDENCES_REQUEST,
        actionTypes.APPEND_EVIDENCES_RECEIVE,
        actionTypes.APPEND_EVIDENCES_ERROR
      ],
      ({ newItems, total }, originalData) => {
        // FIXME: proposition
        // 1. set byId
        // 2. list of sorted ids
        let newData = newItems.reduce((acc, item) => appendItem(acc, item), originalData)

        newData = newData
          .set('total', total)

        // @deprecated
        // left for compatibility
        return newData
          .update('byId', byId => byId)
          .update('ids', ids => ids.union(getIds(newItems)))
          .update('items', items => items.push(...newItems))
          .update('startDate', originalStartDate => getMinDate(originalStartDate, getStartDate(newItems)))
          .set('total', total)
      }
    ),

    [wssActions.actionTypes.ADD]: (state, action) => {
      // TODO: we should have 2 options:
      // - real-time update when we insert new items to `sortedIds` right a way
      // - on-demand update when we store new items to `delayedIds`
      // and would merged them to the `sortedIds` on demand
      const newItem = processItem(action.payload)
      if (isOldItem(state, newItem)) {
        console.log(`we already have ${newItem.id}`)
        return state
      } else {
        console.log(`it is new item ${newItem.id}`)
        return state
          .update('data', data => appendItem(data, newItem)
            .update('ids', ids => ids.add(newItem.id))
            .update('items', items => items.unshift(Immutable.fromJS(newItem)))
            .update('total', total => total + 1)
          )
      }
    }
  }
)

/**
 * Append new item
 * - in byId map
 * - ids - sorted list of Ids
 *
 * @param originalData
 * @param item
 * @param sortBy
 * @returns {Immutable.List<T> | Immutable.Map<K, V> | __Cursor.Cursor | *}
 * @private
 */
function appendItem (originalData, item, sortBy = ['when', 'estimation']) {
  // append item item in sorted list
  const sortedIds = originalData.get('sortedIds')

  function inplaceValue (idx) {
    const inplaceId = sortedIds.get(idx)
    return originalData.getIn(['byId', inplaceId].concat(sortBy))
  }

  const itemFieldValue = _.get(item, sortBy)
  const inplaceLength = sortedIds.count()
  const insertIndex = binarySearchOfCallback(inplaceValue, inplaceLength, itemFieldValue)

  // we could have 3 result here:
  if (insertIndex === inplaceLength) {
    // 1) last element - use push
    originalData = originalData.update('sortedIds', ids => ids.push(item.id))
  } else {
    const inplaceId = sortedIds.getIn([insertIndex, 'id'])
    if (inplaceId !== item.id) {
      // 2) new element - insert
      originalData = originalData.update('sortedIds', ids => ids.insert(insertIndex, item.id))
    }
    // 3) the same element - do nothing
  }

  // append/update item data
  return originalData.setIn(['byId', item.id], Immutable.fromJS(item))
}

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
export function getIds (items) {
  return items.map(i => i.id)
}

/**
 * get minimal date
 *
 * @param args
 * @returns {Date}
 */
function getMinDate (...args) {
  return new Date(Math.min(...args.filter(d => !!d)))
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
  return { ...item, id: item._id }
}
