import Immutable from 'immutable'
import _ from 'lodash'

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'
import asyncReducer from '../async-queue/reducer-builder'
import { getIdsRaw } from '../selectors/evidences'
import { prepareUrl } from '../utils/api-url-processor'

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
      // sorted list of items
      ids: Immutable.Set(),
      items: [],
      // total (globally, not only on this client) number of items
      total: 0,
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
        // const byId = originalData.get('byId')
        // const newData = newItems
        //   .filter(item => !byId.has(item.id))
        //   .reduce((acc, item) => {
        //     // TODO find ids pos
        //     return acc.setIn(['byId', item.id], Immutable.fromJS(item))
        //   }, originalData)
        //
        // return newData
        //   .set('total', total)

        // TODO:
        // 1. set byId
        // 2. list of sorted ids
        return originalData
          .update('byId', byId => byId)
          .update('ids', ids => ids.union(getIds(newItems)))
          .update('items', items => items.push(...newItems))
          .update('startDate', originalStartDate => getMinDate(originalStartDate, getStartDate(newItems)))
          .set('total', total)
      }
    ),

    [wssActions.actionTypes.ADD]: (state, action) => {
      const newItem = processItem(action.payload)
      if (isOldItem(state, newItem)) {
        console.log(`we already have ${newItem.id}`)
        return state
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
