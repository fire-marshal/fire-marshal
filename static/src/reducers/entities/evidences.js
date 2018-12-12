import Immutable from 'immutable'

import { createReducer } from '../_helper'

import config from '../../config'

import { fetchActionSimplified } from '../../async-queue/fetch-action'
import asyncReducer from '../../async-queue/reducer-builder'
import { getIdsRaw } from '../../selectors/entities/evidences'
import { prepareUrl } from '../../utils/api-url-processor'

const namespace = `${require('../../../package').name}/EVIDENCES`

//
// actions
//

// append new items to already existing list
export const actionTypes = {
  APPEND_EVIDENCES_REQUEST: `${namespace}.APPEND:REQUEST`,
  APPEND_EVIDENCES_RECEIVE: `${namespace}.APPEND:RECEIVE`,
  APPEND_EVIDENCES_ERROR: `${namespace}.APPEND:ERROR`,

  INSERT_ITEM: `${namespace}.INSERT_ITEM`,
  INSERT_ITEMS: `${namespace}.INSERT_ITEMS`
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
   * @param res
   *
   * @returns {{items: array, total: number}}
   */
  process: ({ res }) => ({
    items: res.items,
    total: res.total
  })
})

/**
 * Insert new evidence entity
 *
 * @param payload {object}
 * @returns {{type: string, payload: *}}
 */
export const insertItem = (payload) => ({
  type: actionTypes.INSERT_ITEM,
  payload
})

/**
 * Insert new evidence entities
 *
 * @param payload {{ indexes: array, items: array, total: number }}
 * @returns {{type: string, payload: *}}
 */
export const insertItems = (payload) => ({
  type: actionTypes.INSERT_ITEMS,
  payload
})

//
// reducers
//

// TODO: data structure
// it would be better to store information about some bigger events or related (connected)
//
export default createReducer(
  Immutable.fromJS({
    inProgress: false,
    invalid: true,
    error: null,
    updateAt: null,
    data: {
      // items by its id
      byId: Immutable.Map(),
      // total (globally, not only on this client) number of items
      total: 0
    }
  }),
  {
    ...asyncReducer([
      actionTypes.APPEND_EVIDENCES_REQUEST,
      actionTypes.APPEND_EVIDENCES_RECEIVE,
      actionTypes.APPEND_EVIDENCES_ERROR
    ]),

    [actionTypes.INSERT_ITEMS]: (state, { payload: { items, total } }) => {
      // TODO: there we could optimize a little
      // we can element which we had before
      // so if we just replace old with new one
      // all dependent selectors will update it own state
      // but maybe we got the same item (not only by id but by content as well)
      // so we could check whether it really new
      return state.update('data', data => data
        .update('byId', byId =>
          items.reduce((acc, item) => acc.set(item.id, Immutable.fromJS(item)), byId))
        .set('total', total)
      )
    },

    [actionTypes.INSERT_ITEM]: (state, { payload }) => {
      const newItem = payload.item
      if (isOldItem(state, newItem)) {
        console.log(`we already have ${newItem.id}`)
        return state
      } else {
        console.log(`it is new item ${newItem.id}`)
        return state.update('data', data => data
          .update('total', total => total + 1)
          .update('byId', byId => byId.set(newItem.id, Immutable.fromJS(newItem))))
      }
    }
  }
)

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
